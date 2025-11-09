package utils

import (
	"context"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
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

func CreateSession(authClient *auth.Client, idToken string, cookieDuration time.Duration) error {
	_, err := authClient.SessionCookie(context.Background(), idToken, cookieDuration)
	if err != nil {
		return err
	}
	return nil
}

func VerifySession(c *gin.Context, authClient *auth.Client, idToken string) (*auth.Token, error) {

	ctx := context.Background()
	//get the token
	token, err := authClient.VerifyIDToken(ctx, idToken)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
		return nil, err
	}

	return token, nil
}
