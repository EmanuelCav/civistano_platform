package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/EmanuelCav/civistano_platform/middleware"
	"github.com/gofiber/fiber/v2"
)

func RoleRoute(app *fiber.App) {

	app.Get("/roles", middleware.Auth(), middleware.Admin(), controller.Roles)
	app.Post("/roles", middleware.Auth(), middleware.Admin(), controller.CreateRole)

}
