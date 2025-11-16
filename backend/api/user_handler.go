package api

import (
	"chordViewer/types"
	"chordViewer/utils"
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"net/http"
)

var authClient *auth.Client
var firestoreClient *firestore.Client

func RegisterRoutes(router *gin.Engine) {

	setupCORS(router)

	opt := option.WithCredentialsFile("config/guitar-app-key.json")
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil, opt)

	if err != nil {
		_ = fmt.Errorf("error initializing app: %v", err)
		return
	}

	authClient, err = app.Auth(ctx)
	if err != nil {
		panic(err)
	}

	firestoreClient, err = app.Firestore(ctx)
	if err != nil {
		panic(err)
	}

	api := router.Group("/api")
	{
		api.POST("/login", loginHandler)
		api.POST("/register", registerHandler)
		api.POST("/refresh", refreshHandler)
		api.POST("/logout", logoutHandler)

		protected := api.Group("").Use(utils.AuthMiddleware(authClient))
		{
			protected.GET("/me", meHandler)
			protected.POST("/favChord", addFavouriteChordHandler)
			protected.POST("/learnedChord", addLearnedChordHandler)
			protected.DELETE("/favChord", deleteFavouriteChordHandler)
			protected.DELETE("/learnedChord", deleteLearnedChordHandler)
			protected.GET("/chord", chordHandler)
			protected.PUT("/profile-picture", updateProfilePictureHandler)
		}

		admin := api.Group("/admin").Use(utils.AdminMiddleware(authClient, firestoreClient))
		{
			admin.GET("/users/count", getUserCountHandler)
			admin.GET("/users", getUsersHandler)
		}
	}

}
func loginHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	ctx := context.Background()
	token, err := authClient.VerifyIDToken(ctx, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		return
	}

	var body types.User // get body
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	iter := firestoreClient.Collection("users").Where("Email", "==", body.Email).Documents(c)
	doc, err := iter.Next()
	if err == iterator.Done {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query user"})
		return
	}

	var user types.User
	if err := doc.DataTo(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse user data"})
		return
	}

	err = utils.CreateSession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":            "logged_in",
		"uid":               token.UID,
		"email":             body.Email,
		"admin":             user.Admin,
		"profilePictureUrl": user.ProfilePictureUrl,
		"favouriteChords":   user.FavouriteChords,
		"learnedChords":     user.LearnedChords,
	})
}

func registerHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	ctx := context.Background()
	token, err := authClient.VerifyIDToken(ctx, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		return
	}

	var body types.User
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	// Check if user already exists
	iter := firestoreClient.Collection("users").Where("Email", "==", body.Email).Documents(c)
	_, err = iter.Next()
	if err != iterator.Done {
		c.JSON(http.StatusConflict, gin.H{"error": "user already exists"})
		return
	}

	// Create new user document
	newUser := types.User{
		Email:             body.Email,
		Admin:             false, // Default to non-admin
		ProfilePictureUrl: "",
		FavouriteChords:   make([]string, 0),
		LearnedChords:     make([]string, 0),
	}

	_, err = firestoreClient.Collection("users").Doc(token.UID).Set(c, newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user"})
		return
	}

	err = utils.CreateSession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":            "user_created",
		"uid":               token.UID,
		"email":             newUser.Email,
		"admin":             newUser.Admin,
		"profilePictureUrl": newUser.ProfilePictureUrl,
		"favouriteChords":   newUser.FavouriteChords,
		"learnedChords":     newUser.LearnedChords,
	})
}

func meHandler(c *gin.Context) {

	tokenInterface, exists := c.Get("user_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token := tokenInterface.(*auth.Token)

	docRef := firestoreClient.Collection("users").Doc(token.UID)
	docSnap, err := docRef.Get(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var user types.User
	if err := docSnap.DataTo(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse user data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":            "user_data_parsed",
		"uid":               token.UID,
		"email":             user.Email,
		"admin":             user.Admin,
		"profilePictureUrl": user.ProfilePictureUrl,
		"favouriteChords":   user.FavouriteChords,
		"learnedChords":     user.LearnedChords,
	})
}

func refreshHandler(c *gin.Context) {
	// Verify user still has valid refresh token
	_, err := utils.VerifyRefreshToken(c, authClient)
	if err != nil {
		utils.ClearSession(c)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Refresh token expired, please login again",
		})
		return
	}

	// Get new Firebase ID token from header
	idToken, success := utils.GetAuthHeader(c)
	if !success {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing Authorization header with new ID token",
		})
		return
	}

	// Verify new ID token
	token, err := authClient.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid ID token"})
		return
	}

	// Create new session cookies
	err = utils.CreateSession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to refresh session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "tokens_refreshed",
		"uid":    token.UID,
	})
}

func logoutHandler(c *gin.Context) {
	utils.ClearSession(c)
	c.JSON(http.StatusOK, gin.H{"status": "logged_out"})
}

func updateProfilePictureHandler(c *gin.Context) {
	tokenInterface, exists := c.Get("user_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token := tokenInterface.(*auth.Token)

	var body struct {
		ProfilePictureUrl string `json:"profilePictureUrl"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	docRef := firestoreClient.Collection("users").Doc(token.UID)
	_, err := docRef.Update(context.Background(), []firestore.Update{
		{Path: "ProfilePictureUrl", Value: body.ProfilePictureUrl},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update profile picture"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":            "profile_picture_updated",
		"profilePictureUrl": body.ProfilePictureUrl,
	})
}

func setupCORS(router *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://localhost:8080", "http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept"}
	config.AllowCredentials = true
	router.Use(cors.New(config))
}
