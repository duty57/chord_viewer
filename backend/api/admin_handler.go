package api

import (
	"chordViewer/types"
	"cloud.google.com/go/firestore"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	"context"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func getUserCountHandler(c *gin.Context) {
	query := firestoreClient.Collection("users")
	ctx := context.Background()
	result, err := query.NewAggregationQuery().WithCount("count").Get(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	count, success := result["count"]
	if !success {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "count not found"})
		return
	}

	countValue := count.(*firestorepb.Value).GetIntegerValue()

	c.JSON(http.StatusOK, gin.H{
		"count": countValue,
	})
}

func getUsersHandler(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid page number"})
		return
	}
	limit := 5
	offset := (page - 1) * limit

	ctx := context.Background()
	query := firestoreClient.Collection("users").OrderBy("Email", firestore.Asc).Offset(offset).Limit(limit)

	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch users"})
	}
	var users []types.User
	for _, doc := range docs {
		var user types.User
		if err := doc.DataTo(&user); err != nil {
			continue
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
		"page":  page,
	})
}

func updateUserEmailHandler(c *gin.Context) {
	type RequestBody struct {
		PrevEmail string `json:"prevEmail"`
		NewEmail  string `json:"newEmail"`
	}

	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	if req.PrevEmail == "" || req.NewEmail == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "both emails are required"})
		return
	}
	ctx := context.Background()

	query := firestoreClient.Collection("users").Where("Email", "==", req.PrevEmail).Limit(1)
	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
		return
	}

	userDoc := docs[0]
	uid := userDoc.Ref.ID

	params := (&auth.UserToUpdate{}).Email(req.NewEmail)
	_, err = authClient.UpdateUser(ctx, uid, params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update email"})
		return
	}

	_, err = userDoc.Ref.Update(ctx, []firestore.Update{
		{Path: "Email", Value: req.NewEmail},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update firestore email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "email_updated",
		"email":  req.NewEmail,
	})
}

func updateUserProfilePictureHandler(c *gin.Context) {
	type RequestBody struct {
		Email             string `json:"email"`
		ProfilePictureUrl string `json:"profilePictureUrl"`
	}

	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
	}

	if req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email was not provided"})
		return
	}

	ctx := context.Background()

	query := firestoreClient.Collection("users").Where("Email", "==", req.Email).Limit(1)
	docs, err := query.Documents(ctx).GetAll()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	userDoc := docs[0]

	_, err = userDoc.Ref.Update(ctx, []firestore.Update{
		{Path: "ProfilePictureUrl", Value: req.ProfilePictureUrl},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update profile picture"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "profile_picture_updated",
	})
}

func promoteToAdminHandler(c *gin.Context) {
	type RequestBody struct {
		Email string `json:"email"`
	}
	var req RequestBody
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
	}

	if req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email was not provided"})
		return
	}

	ctx := context.Background()

	query := firestoreClient.Collection("users").Where("Email", "==", req.Email).Limit(1)
	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	userDoc := docs[0]

	_, err = userDoc.Ref.Update(ctx, []firestore.Update{
		{Path: "Admin", Value: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to promote user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "user_promoted",
	})
}

func deleteUserHandler(c *gin.Context) {
	email := c.Query("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email was not provided"})
		return
	}

	ctx := context.Background()

	query := firestoreClient.Collection("users").Where("Email", "==", email).Limit(1)
	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	userDoc := docs[0]

	var user types.User
	if err = userDoc.DataTo(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read user data"})
		return
	}

	if user.Admin {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete an admin"})
		return
	}

	uid := userDoc.Ref.ID

	err = authClient.DeleteUser(ctx, uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete user from auth"})
		return
	}

	_, err = userDoc.Ref.Delete(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete user from firestore"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "user_deleted",
	})
}

func accessAdminPageHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "allow_access",
		"admin":  true,
	})
}
