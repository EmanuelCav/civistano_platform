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

func Roles(c *fiber.Ctx) error {

	var roles []models.RoleModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionRole().Find(ctx, bson.M{})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var role models.RoleModel

		if err := cursor.Decode(&role); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		roles = append(roles, role)
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"roles": roles,
	})

}

func CreateRole(c *fiber.Ctx) error {

	var role models.CreateRoleModel

	ctx, cancel := context.Context()
	defer cancel()

	if err := c.BodyParser(&role); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&role); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "There are empty field. Please complete",
		})
	}

	if err := validation.RoleValid(role); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	newRole := models.RoleModel{
		Id:        primitive.NewObjectID(),
		Role:      role.Role,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err := connections.ConnectionRole().InsertOne(ctx, newRole)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"role":    newRole,
		"message": "Role created successfully",
	})

}
