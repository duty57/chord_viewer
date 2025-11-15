package api

import (
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
)

func getUserCount(c *gin.Context) {
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
