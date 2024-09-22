package main

import (
	"log"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {

	app := fiber.New()

	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app.Use(logger.New())
	app.Use(cors.New())

	routes.UserRoute(app)
	routes.RoleRoute(app)

	err2 := app.Listen(":" + config.Config()["port"])

	if err2 != nil {
		log.Fatal("Error to connect server")
	}

	log.Println("Server o port " + config.Config()["port"])

}
