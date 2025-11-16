package api

import (
	"chordViewer/types"
	"cloud.google.com/go/firestore"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	"context"
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
