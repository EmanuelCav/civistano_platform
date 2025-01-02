package controller

import (
	"time"

	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/helper"
	"github.com/EmanuelCav/civistano_platform/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Checklists(c *fiber.Ctx) error {

	var checklists []models.ChecklistModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionChecklist().Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var checklist models.ChecklistModel

		if err := cursor.Decode(&checklist); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		checklists = append(checklists, checklist)
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"checklists": checklists,
	})

}

func CreateChecklist(c *fiber.Ctx) error {

	var checklist models.CreateChecklistModel

	ctx, cancel := context.Context()
	defer cancel()

	if err := c.BodyParser(&checklist); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&checklist); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	newChecklist := models.ChecklistModel{
		Id:          primitive.NewObjectID(),
		Title:       checklist.Title,
		Description: checklist.Description,
		AreParents:  checklist.AreParents,
		List:        []string{""},
		CreatedAt:   primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt:   primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err := connections.ConnectionChecklist().InsertOne(ctx, newChecklist)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"checklist": newChecklist,
		"message":   "Checklist created successfully",
	})

}
