package api

import (
	"chordViewer/utils"
	"cloud.google.com/go/firestore"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func addFavouriteChordHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
		return
	}

	//get the chord
	type RequestBody struct {
		Chord string `json:"chord"`
	}
	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	//add chord to the firestore
	docRef := firestoreClient.Collection("users").Doc(token.UID)
	_, err = docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "FavouriteChords",
			Value: firestore.ArrayUnion(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to favourites",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func addLearnedChordHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
		return
	}

	//get the chord
	type RequestBody struct {
		Chord string `json:"chord"`
	}
	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	//add chord to the firestore
	docRef := firestoreClient.Collection("users").Doc(token.UID)
	_, err = docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "LearnedChords",
			Value: firestore.ArrayUnion(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to learned",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func deleteFavouriteChordHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
		return
	}

	//get the chord
	type RequestBody struct {
		Chord string `json:"chord"`
	}
	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	//add chord to the firestore
	docRef := firestoreClient.Collection("users").Doc(token.UID)
	_, err = docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "FavouriteChords",
			Value: firestore.ArrayRemove(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to favourites",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func deleteLearnedChordHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}

	token, err := utils.VerifySession(c, authClient, idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
		return
	}

	//get the chord
	type RequestBody struct {
		Chord string `json:"chord"`
	}
	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	//add chord to the firestore
	docRef := firestoreClient.Collection("users").Doc(token.UID)
	_, err = docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "LearnedChords",
			Value: firestore.ArrayRemove(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = utils.CreateSession(authClient, idToken, time.Minute*30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create session cookie"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to learned",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func chordHandler(c *gin.Context) {
	////check the cookie
	//idToken, err := c.Cookie("session")
	//if err != nil {
	//	c.JSON(http.StatusUnauthorized, gin.H{"error": "No session cookie"})
	//	return
	//}
	//ctx := context.Background()
	////get the token
	//token, err := authClient.VerifySessionCookie(ctx, cookie)
	//if err != nil {
	//	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired session"})
	//	return
	//}
}
