package api

import (
	"chordViewer/types"
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
		api.POST("/login", loginHandler)
		api.POST("/register", registerHandler)
	}
}
func loginHandler(c *gin.Context) {

	idToken := c.GetHeader("Authorization") //get token
	if idToken == "" || len(idToken) < 7 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing Authorization header"})
		return
	}

	idToken = idToken[7:]
	token, err := authClient.VerifyIDToken(c, idToken) //verify token
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid ID token"})
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

	cookieDuration := time.Hour * 24
	sessionCookie, err := authClient.SessionCookie(context.Background(), idToken, cookieDuration)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.SetCookie(
		"session",
		sessionCookie,
		int(cookieDuration),
		"/",
		"localhost",
		false,
		true,
	)

	c.JSON(http.StatusOK, gin.H{
		"status": "logged_in",
		"uid":    token.UID,
		"email":  body.Email,
		"admin":  user.Admin,
	})
}

func registerHandler(c *gin.Context) {

	idToken := c.GetHeader("Authorization")
	if idToken == "" || len(idToken) < 7 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing Authorization header"})
		return
	}

	idToken = idToken[7:]
	token, err := authClient.VerifyIDToken(c, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid ID token"})
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
		Email: body.Email,
		Admin: false, // Default to non-admin
	}

	_, err = firestoreClient.Collection("users").Doc(token.UID).Set(c, newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user"})
		return
	}

	cookieDuration := time.Hour * 24
	sessionCookie, err := authClient.SessionCookie(context.Background(), idToken, cookieDuration)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.SetCookie(
		"session",
		sessionCookie,
		int(cookieDuration),
		"/",
		"localhost",
		false,
		true,
	)
	c.JSON(http.StatusCreated, gin.H{
		"status": "user created",
		"uid":    token.UID,
		"email":  newUser.Email,
		"admin":  newUser.Admin,
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
