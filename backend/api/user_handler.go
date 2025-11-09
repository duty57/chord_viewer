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
	"time"
)

var authClient *auth.Client
var firestoreClient *firestore.Client

func RegisterRoutes(router *gin.Engine) {

	setupCORS(router)

	opt := option.WithCredentialsFile("config/guitar-app-key.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)

	if err != nil {
		_ = fmt.Errorf("error initializing app: %v", err)
		return
	}

	authClient, err = app.Auth(context.Background())
	if err != nil {
		panic(err)
	}

	firestoreClient, err = app.Firestore(context.Background())
	if err != nil {
		panic(err)
	}

	api := router.Group("/api")
	{
		api.GET("/me", meHandler)
		api.POST("/login", loginHandler)
		api.POST("/register", registerHandler)
		api.POST("/favChord", addFavouriteChordHandler)
		api.POST("/learnedChord", addLearnedChordHandler)
		api.DELETE("/favChord", deleteFavouriteChordHandler)
		api.DELETE("/learnedChord", deleteLearnedChordHandler)
		api.GET("/chord", chordHandler)
	}
}
func loginHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
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

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":          "logged_in",
		"uid":             token.UID,
		"email":           body.Email,
		"admin":           user.Admin,
		"favouriteChords": user.FavouriteChords,
		"learnedChords":   user.LearnedChords,
	})
}

func registerHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
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
		Email:           body.Email,
		Admin:           false, // Default to non-admin
		FavouriteChords: make([]string, 0),
		LearnedChords:   make([]string, 0),
	}

	_, err = firestoreClient.Collection("users").Doc(token.UID).Set(c, newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user"})
		return
	}

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":          "user_created",
		"uid":             token.UID,
		"email":           newUser.Email,
		"admin":           newUser.Admin,
		"favouriteChords": newUser.FavouriteChords,
		"learnedChords":   newUser.LearnedChords,
	})
}

func meHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
		fmt.Errorf("invalid TOKEEN")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
		return
	}

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

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":          "user_data_parsed",
		"uid":             token.UID,
		"email":           user.Email,
		"admin":           user.Admin,
		"favouriteChords": user.FavouriteChords,
		"learnedChords":   user.LearnedChords,
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
