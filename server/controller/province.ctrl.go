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

func Provinces(c *fiber.Ctx) error {

	var provinces []models.ProvinceModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionProvince().Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var province models.ProvinceModel

		if err := cursor.Decode(&province); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		provinces = append(provinces, province)
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"provinces": provinces,
	})

}

func CreateProvince(c *fiber.Ctx) error {

	var province models.CreateProvinceModel

	ctx, cancel := context.Context()
	defer cancel()

	if err := c.BodyParser(&province); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&province); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := validation.ProvinceValid(province); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	newProvince := models.ProvinceModel{
		Id:        primitive.NewObjectID(),
		Country:   province.Country,
		Province:  province.Province,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err := connections.ConnectionProvince().InsertOne(ctx, newProvince)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"province": newProvince,
		"message":  "Province created successfully",
	})

}
