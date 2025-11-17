package utils

import (
	"cloud.google.com/go/firestore"
	"context"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetAuthHeader(c *gin.Context) (string, bool) {
	idToken := c.GetHeader("Authorization")
	if idToken == "" || len(idToken) < 7 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing Authorization header"})
		return "", false
	}

	idToken = idToken[7:]
	return idToken, true
}

func AuthMiddleware(authClient *auth.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		idToken, success := GetAuthHeader(c)
		if !success {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing or invalid Authorization header"})
			return
		}

		token, err := authClient.VerifyIDToken(context.Background(), idToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			return
		}

		c.Set("user_token", token)
		c.Next()
	}
}

func AdminMiddleware(authClient *auth.Client, firestoreClient *firestore.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Check Authorization header
		idToken, success := GetAuthHeader(c)
		if !success {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing or invalid Authorization header"})
			return
		}

		token, err := authClient.VerifyIDToken(context.Background(), idToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			return
		}

		// Check if user is admin
		userDoc, err := firestoreClient.Collection("users").Doc(token.UID).Get(context.Background())
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user data"})
			return
		}

		data := userDoc.Data()
		isAdmin, ok := data["Admin"].(bool)
		if !ok || !isAdmin {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Access denied: Admin privileges required"})
			return
		}

		c.Set("user_token", token)
		c.Next()
	}
}
