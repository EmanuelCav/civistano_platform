package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/gofiber/fiber/v2"
)

func LinkRoute(app *fiber.App) {

	app.Get("/links", controller.Links)
	app.Post("/links/provinces/:pid/checklists/:cid", controller.CreateLink)

}
