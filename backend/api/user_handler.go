package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func RegisterRoutes(router *gin.Engine) {
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to the Go Gin API!"})
	})

	api := router.Group("/api")
	{
		api.GET("/users", getUsers)
		api.POST("/users", createUser)
	}
}

func getUsers(c *gin.Context) {
	users := []string{"Alice", "Bob", "Charlie"}
	c.JSON(http.StatusOK, gin.H{"users": users})
}

func createUser(c *gin.Context) {
	var json struct {
		Name string `json:"name" binding:"required"`
	}
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "User created", "name": json.Name})
}
