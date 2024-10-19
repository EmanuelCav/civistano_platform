package routes

import (
	"github.com/EmanuelCav/civistano_platform/controller"
	"github.com/gofiber/fiber/v2"
)

func ChecklistRoute(app *fiber.App) {

	app.Get("/checklists", controller.Checklists)
	app.Post("/checklists", controller.CreateChecklist)

}
