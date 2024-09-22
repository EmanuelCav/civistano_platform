package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/EmanuelCav/civistano_platform/middleware"
	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {

	app.Get("/users", controller.Users)
	app.Post("/users/login", controller.Login)
	app.Post("/users/register", controller.CreateUser)
	app.Delete("/users/:id", middleware.Auth(), middleware.Admin(), controller.CreateUser)

}
