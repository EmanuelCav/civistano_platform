package controller

import (
	"time"

	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/helper"
	"github.com/EmanuelCav/civistano_platform/models"
	"github.com/EmanuelCav/civistano_platform/validation"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Ancestors(c *fiber.Ctx) error {

	var ancestors []models.AncestryModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionAncestry().Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var ancestry models.AncestryModel

		if err := cursor.Decode(&ancestry); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		ancestors = append(ancestors, ancestry)
	}

	ancestors = ancestors[1:]

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"ancestors": ancestors,
	})

}

func CreateAncestry(c *fiber.Ctx) error {

	var ancestry models.CreateAncestryModel

	ctx, cancel := context.Context()
	defer cancel()

	if err := c.BodyParser(&ancestry); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&ancestry); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := validation.AncestryValid(ancestry); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	newAncestry := models.AncestryModel{
		Id:         primitive.NewObjectID(),
		Ancestry:   ancestry.Ancestry,
		Hierarchy:  ancestry.Hierarchy,
		IsFemale:   ancestry.IsFemale,
		AreParents: ancestry.AreParents,
		IsHidden:   ancestry.IsHidden,
		CreatedAt:  primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt:  primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err := connections.ConnectionAncestry().InsertOne(ctx, newAncestry)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"ancestry": newAncestry,
		"message":  "Ancestry created successfully",
	})

}
