package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/gofiber/fiber/v2"
)

func ProvinceRoute(app *fiber.App) {

	app.Get("/provinces", controller.Provinces)
	app.Post("/provinces", controller.CreateProvince)

}
