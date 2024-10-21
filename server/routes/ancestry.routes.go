package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/gofiber/fiber/v2"
)

func AncestryRoute(app *fiber.App) {

	app.Get("/ancestors", controller.Ancestors)
	app.Post("/ancestors", controller.CreateAncestry)

}
