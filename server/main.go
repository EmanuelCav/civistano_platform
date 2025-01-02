package main

import (
	"log"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {

	app := fiber.New()

	// err := godotenv.Load()

	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	routes.UserRoute(app)
	routes.RoleRoute(app)
	routes.AncestryRoute(app)
	routes.ProvinceRoute(app)
	routes.LinkRoute(app)
	routes.ChecklistRoute(app)

	err2 := app.Listen(":" + config.Config()["port"])

	if err2 != nil {
		log.Fatal("Error to connect server")
	}

	log.Println("Server o port " + config.Config()["port"])

}
