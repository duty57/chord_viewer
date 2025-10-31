package main

import (
	"chordViewer/api"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	api.RegisterRoutes(router)

	err := router.Run(":8081")
	if err != nil {
		return
	}
}
