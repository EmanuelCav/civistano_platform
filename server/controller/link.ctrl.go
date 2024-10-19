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

func Links(c *fiber.Ctx) error {

	var links []models.LinkModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionLink().Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var link models.LinkModel

		if err := cursor.Decode(&link); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		links = append(links, link)
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"links": links,
	})

}

func CreateLink(c *fiber.Ctx) error {

	var link models.CreateLinkModel
	var province models.ProvinceModel
	var checklist models.ChecklistModel

	ctx, cancel := context.Context()
	defer cancel()

	cid := c.Params("cid")
	pid := c.Params("pid")

	checklistId, err1 := primitive.ObjectIDFromHex(cid)

	if err1 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err1.Error(),
		})
	}

	provinceId, err2 := primitive.ObjectIDFromHex(pid)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2.Error(),
		})
	}

	if err := c.BodyParser(&link); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&link); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := validation.LinkValid(link); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	if err := connections.ConnectionProvince().FindOne(ctx, bson.M{"_id": provinceId}).Decode(&province); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Province does not exists",
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"_id": checklistId}).Decode(&checklist); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Checklist does not exists",
		})
	}

	newLink := models.LinkModel{
		Id:        primitive.NewObjectID(),
		Province:  province.Id,
		Checklist: checklist.Id,
		Link:      link.Link,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err3 := connections.ConnectionLink().InsertOne(ctx, newLink)

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err3.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"link":    newLink,
		"message": "Link created successfully",
	})

}
