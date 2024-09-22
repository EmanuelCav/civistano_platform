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

	ctx, cancel := context.Context()
	defer cancel()

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

	var err error

	if user.Role == "" {
		err = connections.ConnectionRole().FindOne(ctx, bson.M{"role": config.Config()["defaultRole"]}).Decode(&roleUser)
	} else {
		err = connections.ConnectionRole().FindOne(ctx, bson.M{"role": user.Role}).Decode(&roleUser)
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	user.Password = helper.HashPassword(user.Password)

	newUser := models.UserModel{
		Id:        primitive.NewObjectID(),
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		Password:  user.Password,
		Email:     user.Email,
		Role:      roleUser.Id,
		Status:    false,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err2 := connections.ConnectionUser().InsertOne(ctx, newUser)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2.Error(),
		})
	}

	token := helper.GenerateToken(newUser.Id)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  newUser,
		"token": token,
	})

}

func Login(c *fiber.Ctx) error {

	var user models.LoginModel
	var userLoggedIn models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	err := c.BodyParser(&user)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "There are empty. Please complete",
		})
	}

	if err := validation.LoginValid(user); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	connections.ConnectionUser().FindOne(ctx, bson.M{"email": user.Email}, helper.UserFilter()).Decode(&userLoggedIn)

	token := helper.GenerateToken(userLoggedIn.Id)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  userLoggedIn,
		"token": token,
	})

}

func RemoveUser(c *fiber.Ctx) error {

	var user models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	id := c.Params("id")

	userId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
			"message": "User does not exists",
		})
	}

	if err := connections.ConnectionUser().FindOneAndDelete(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "User removed successfully",
	})

}
