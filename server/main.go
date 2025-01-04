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

	godotenv.Load()

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		// AllowOrigins: config.Config()["originProd"],
	}))

	routes.UserRoute(app)
	routes.RoleRoute(app)
	routes.AncestryRoute(app)
	routes.ProvinceRoute(app)
	routes.LinkRoute(app)
	routes.ChecklistRoute(app)

	log.Fatal(app.Listen(":" + config.Config()["port"]))

}
