package utils

import (
	"cloud.google.com/go/firestore"
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

func CreateSession(c *gin.Context, authClient *auth.Client, idToken string) error {
	accessToken, err := authClient.SessionCookie(context.Background(), idToken, time.Minute*15)
	if err != nil {
		return err
	}

	refreshToken, err := authClient.SessionCookie(context.Background(), idToken, time.Hour*24*14)
	if err != nil {
		return err
	}

	accessCookie := http.Cookie{
		Name:     "access_token",
		Value:    accessToken,
		Path:     "/",
		Domain:   "",
		MaxAge:   int((time.Minute * 15).Seconds()),
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(c.Writer, &accessCookie)

	refreshCookie := http.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		Path:     "/",
		Domain:   "",
		MaxAge:   int((time.Hour * 24 * 14).Seconds()),
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(c.Writer, &refreshCookie)

	return nil
}

func VerifyAccessToken(c *gin.Context, authClient *auth.Client) (*auth.Token, error) {
	cookie, err := c.Cookie("access_token")
	if err != nil {
		return nil, err
	}

	token, err := authClient.VerifySessionCookie(context.Background(), cookie)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func VerifyRefreshToken(c *gin.Context, authClient *auth.Client) (*auth.Token, error) {
	cookie, err := c.Cookie("refresh_token")
	if err != nil {
		return nil, err
	}

	token, err := authClient.VerifySessionCookie(context.Background(), cookie)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func ClearSession(c *gin.Context) {
	accessCookie := http.Cookie{
		Name:     "access_token",
		Value:    "",
		Path:     "/",
		Domain:   "",
		MaxAge:   -1,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(c.Writer, &accessCookie)

	refreshCookie := http.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Path:     "/",
		Domain:   "",
		MaxAge:   -1,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(c.Writer, &refreshCookie)
}

func AuthMiddleware(authClient *auth.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := VerifyAccessToken(c, authClient)
		if err == nil {
			c.Set("user_token", token)
			c.Next()
			return
		}

		token, err = VerifyRefreshToken(c, authClient)
		if err != nil {
			ClearSession(c)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session expired, please login again"})
			return
		}

		idToken := c.GetHeader("Authorization")
		if idToken != "" && len(idToken) > 7 {
			idToken = idToken[7:]
			err = CreateSession(c, authClient, idToken)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to refresh session"})
				return
			}
		}

		c.Set("user_token", token)
		c.Next()
	}
}

func AdminMiddleware(authClient *auth.Client, firestoreClient *firestore.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		// First verify authentication
		token, err := VerifyAccessToken(c, authClient)
		if err != nil {
			token, err = VerifyRefreshToken(c, authClient)
			if err != nil {
				ClearSession(c)
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session expired, please login again"})
				return
			}
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
