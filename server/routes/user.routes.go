package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/EmanuelCav/civistano_platform/middleware"
	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {

	app.Get("/users", controller.Users)
	app.Get("/users/:id", middleware.Auth(), controller.User)
	app.Post("/users/ancestors/:id", controller.CreateUser)
	app.Post("/users", controller.LoginUser)
	app.Post("/users/code", middleware.Code(), controller.CodeUser)
	app.Post("/users/contact", middleware.Auth(), controller.Contact)
	app.Patch("/users/ancestors/:id", middleware.Auth(), controller.CreateAncestryUser)
	app.Patch("/users", middleware.Auth(), controller.RemoveLastAncestry)
	app.Patch("/users/restart", middleware.Auth(), controller.RestartUser)
	app.Put("/users/ancestors/:id", middleware.Auth(), controller.UpdateAncestryUser)
	app.Delete("/users/:id", middleware.Auth(), controller.RemoveUser)

}
