package api

import (
	"chordViewer/types"
	"chordViewer/utils"
	"cloud.google.com/go/firestore"
	"context"
	"encoding/json"
	"firebase.google.com/go/auth"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func addFavouriteChordHandler(c *gin.Context) {

	tokenInterface, exists := c.Get("user_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token := tokenInterface.(*auth.Token)

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
	_, err := docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "FavouriteChords",
			Value: firestore.ArrayUnion(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to favourites",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func addLearnedChordHandler(c *gin.Context) {

	tokenInterface, exists := c.Get("user_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token := tokenInterface.(*auth.Token)

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
	_, err := docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "LearnedChords",
			Value: firestore.ArrayUnion(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to learned",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func deleteFavouriteChordHandler(c *gin.Context) {

	tokenInterface, exists := c.Get("user_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token := tokenInterface.(*auth.Token)

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
	_, err := docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "FavouriteChords",
			Value: firestore.ArrayRemove(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to favourites",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func deleteLearnedChordHandler(c *gin.Context) {

	tokenInterface, exists := c.Get("user_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token := tokenInterface.(*auth.Token)

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
	_, err := docRef.Update(context.Background(), []firestore.Update{
		{
			Path:  "LearnedChords",
			Value: firestore.ArrayRemove(req.Chord),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chord added to learned",
		"uid":     token.UID,
		"chord":   req.Chord,
	})
}

func chordHandler(c *gin.Context) {

	idToken, success := utils.GetAuthHeader(c)
	if !success {
		return
	}
	chordName := c.Query("chord")

	if chordName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Chord was not provided"})
		return
	}

	url := fmt.Sprintf("https://guitar-app-b28eb-default-rtdb.europe-west1.firebasedatabase.app/%s.json?auth=%s", chordName, idToken)

	response, err := http.Get(url)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		c.JSON(http.StatusNotFound, gin.H{"error": "Chord not found"})
		return
	}

	var chordArray []types.Chord
	if err := json.NewDecoder(response.Body).Decode(&chordArray); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"chord":      chordName,
		"positions":  chordArray[0].Positions,
		"fingerings": chordArray[0].Fingerings[0],
	})

}
