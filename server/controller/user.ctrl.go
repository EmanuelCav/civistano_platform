package controller

import (
	"time"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/helper"
	"github.com/EmanuelCav/civistano_platform/models"
	"github.com/EmanuelCav/civistano_platform/validation"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Users(c *fiber.Ctx) error {

	var users []models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionUser().Find(ctx, bson.M{}, helper.UsersFilter())

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var user models.UserModel

		if err := cursor.Decode(&user); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		users = append(users, user)
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"users": users,
	})

}

func CreateUser(c *fiber.Ctx) error {

	var user models.CreateUserModel
	var roleUser models.RoleModel
	var ancestry models.AncestryModel

	ctx, cancel := context.Context()
	defer cancel()

	id := c.Params("id")

	ancestryId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "There are empty fields. Please complete",
		})
	}

	if err := validation.RegisterValid(user); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	if err := connections.ConnectionRole().FindOne(ctx, bson.M{"role": config.Config()["defaultRole"]}).Decode(&roleUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionAncestry().FindOne(ctx, bson.M{"_id": ancestryId}).Decode(&ancestry); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	newAncestryUser := models.AncestryUserModel{
		Id:        primitive.NewObjectID(),
		Ancestry:  ancestry.Id,
		Firstname: "",
		Lastname:  "",
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err2 := connections.ConnectionUserAncestry().InsertOne(ctx, newAncestryUser)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2.Error(),
		})
	}

	newUser := models.UserModel{
		Id:        primitive.NewObjectID(),
		Firstname: "",
		Lastname:  "",
		Email:     user.Email,
		Role:      roleUser.Id,
		Status:    false,
		IsMarried: false,
		Ancestry:  newAncestryUser.Id,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err3 := connections.ConnectionUser().InsertOne(ctx, newUser)

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err3.Error(),
		})
	}

	token := helper.GenerateToken(newUser.Id)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  newUser,
		"token": token,
	})

}
