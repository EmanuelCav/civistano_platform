package controller

import (
	"fmt"
	"strconv"
	"time"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/helper"
	"github.com/EmanuelCav/civistano_platform/middleware"
	"github.com/EmanuelCav/civistano_platform/models"
	"github.com/EmanuelCav/civistano_platform/utils"
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

func User(c *fiber.Ctx) error {

	var user models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	userId, err := middleware.UserId(c)

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	token := helper.GenerateToken(userId)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  user,
		"token": token,
	})

}

func CreateUser(c *fiber.Ctx) error {

	var userCreated models.UserModel
	var user models.CreateUserModel
	var roleUser models.RoleModel
	var ancestryYou models.AncestryModel
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

	if err := connections.ConnectionAncestry().FindOne(ctx, bson.M{"ancestry": config.Config()["ancestryYou"]}).Decode(&ancestryYou); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	newAncestryYou := models.AncestryUserModel{
		Id: primitive.NewObjectID(),
		Ancestry: models.AncestryModel{
			Id:         ancestryYou.Id,
			Ancestry:   ancestryYou.Ancestry,
			Hierarchy:  ancestryYou.Hierarchy,
			IsFemale:   ancestryYou.IsFemale,
			AreParents: ancestryYou.AreParents,
			IsHidden:   ancestryYou.IsHidden,
			CreatedAt:  ancestryYou.CreatedAt,
			UpdatedAt:  ancestryYou.UpdatedAt,
		},
		Checklist: []primitive.ObjectID{},
		Firstname: "",
		Lastname:  "",
		Weddings:  0,
		Divorces:  0,
		Children:  0,
		Death:     false,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	newAncestryUser := models.AncestryUserModel{
		Id: primitive.NewObjectID(),
		Ancestry: models.AncestryModel{
			Id:         ancestry.Id,
			Ancestry:   ancestry.Ancestry,
			Hierarchy:  ancestry.Hierarchy,
			IsFemale:   ancestry.IsFemale,
			AreParents: ancestry.AreParents,
			IsHidden:   ancestry.IsHidden,
			CreatedAt:  ancestry.CreatedAt,
			UpdatedAt:  ancestry.UpdatedAt,
		},
		Checklist: []primitive.ObjectID{},
		Firstname: "",
		Lastname:  "",
		Weddings:  0,
		Divorces:  0,
		Children:  0,
		Death:     false,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	newUser := models.UserModel{
		Id:        primitive.NewObjectID(),
		Firstname: "",
		Lastname:  "",
		Email:     user.Email,
		Role:      roleUser.Id,
		Ancestry: []models.AncestryUserModel{
			newAncestryUser,
			newAncestryYou,
		},
		Status:    false,
		IsMarried: false,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err3 := connections.ConnectionUser().InsertOne(ctx, newUser)

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err3.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": newUser.Id}).Decode(&userCreated); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	utils.SendMail(userCreated.Email)

	token := helper.GenerateToken(newUser.Id)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  userCreated,
		"token": token,
	})

}

func LoginUser(c *fiber.Ctx) error {

	var user models.CreateUserModel
	var userLoggedIn models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Por favor, escribe tu dirrección de correo electrónico",
		})
	}

	if err := validation.LoginValid(user); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"email": user.Email}).Decode(&userLoggedIn); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Dirección de correo electrónico no encontrado",
		})
	}

	code := helper.GenerateRandomCode()

	token := helper.GenerateTokenLogin(code, userLoggedIn.Id)

	utils.SendMailCode(userLoggedIn.Email, strconv.Itoa(code))

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"token": token,
	})

}

func CodeUser(c *fiber.Ctx) error {

	var userCode models.CodeUserModel
	var userLoggedIn models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	if err := c.BodyParser(&userCode); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&userCode); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Por favor, escribe tu dirrección de correo electrónico",
		})
	}

	if err := validation.CodeValid(userCode); err != "" {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err,
		})
	}

	code, userId, err := middleware.CodeId(c)

	fmt.Println(code)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if userCode.Code != code {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Código de verificación incorrecto. Intenta otro",
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&userLoggedIn); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Dirección de correo electrónico no encontrado",
		})
	}

	token := helper.GenerateToken(userId)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"token": token,
		"user":  userLoggedIn,
	})

}

func CreateAncestryUser(c *fiber.Ctx) error {

	var ancestry models.AncestryModel
	var user models.UserModel
	var userUpdated models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	id := c.Params("id")

	ancestryId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	userId, err := middleware.UserId(c)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
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
		Id: primitive.NewObjectID(),
		Ancestry: models.AncestryModel{
			Id:         ancestry.Id,
			Ancestry:   ancestry.Ancestry,
			Hierarchy:  ancestry.Hierarchy,
			IsFemale:   ancestry.IsFemale,
			AreParents: ancestry.AreParents,
			IsHidden:   ancestry.IsHidden,
			CreatedAt:  ancestry.CreatedAt,
			UpdatedAt:  ancestry.UpdatedAt,
		},
		Checklist: []primitive.ObjectID{},
		Firstname: "",
		Lastname:  "",
		Weddings:  0,
		Divorces:  0,
		Children:  0,
		Death:     false,
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	pos := len(user.Ancestry) - ancestry.Hierarchy

	user.Ancestry = append(user.Ancestry[:pos], append([]models.AncestryUserModel{newAncestryUser}, user.Ancestry[pos:]...)...)

	update := bson.M{
		"$set": bson.M{
			"ancestry": user.Ancestry,
		},
	}

	_, err2 := connections.ConnectionUser().UpdateOne(ctx, bson.M{"_id": userId}, update)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&userUpdated); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user": userUpdated,
	})

}

func UpdateAncestryUser(c *fiber.Ctx) error {

	var ancestry models.AncestryModel
	var user models.UserModel
	var userUpdated models.UserModel
	var ancestryUpdate models.UpdateAncestryUserModel

	ctx, cancel := context.Context()
	defer cancel()

	id := c.Params("id")

	ancestryId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	userId, err := middleware.UserId(c)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := c.BodyParser(&ancestryUpdate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionAncestry().FindOne(ctx, bson.M{"_id": ancestryId}).Decode(&ancestry); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	var ancestryUserIndex int

	for i, ancestor := range user.Ancestry {
		if ancestor.Ancestry.Id == ancestry.Id {
			ancestryUserIndex = i
			break
		}
	}

	user.Ancestry[ancestryUserIndex] = models.AncestryUserModel{
		Id:        user.Ancestry[ancestryUserIndex].Id,
		Firstname: user.Ancestry[ancestryUserIndex].Firstname,
		Lastname:  user.Ancestry[ancestryUserIndex].Lastname,
		Ancestry:  user.Ancestry[ancestryUserIndex].Ancestry,
		Checklist: user.Ancestry[ancestryUserIndex].Checklist,
		Weddings:  ancestryUpdate.Weddings,
		Children:  ancestryUpdate.Children,
		Divorces:  ancestryUpdate.Divorces,
		Death:     ancestryUpdate.Death,
		CreatedAt: user.Ancestry[ancestryUserIndex].CreatedAt,
		UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	update := bson.M{
		"$set": bson.M{
			"ancestry": user.Ancestry,
		},
	}

	_, err2 := connections.ConnectionUser().UpdateOne(ctx, bson.M{"_id": userId}, update)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&userUpdated); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user": userUpdated,
	})

}

func RemoveUser(c *fiber.Ctx) error {

	var user models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	userId, err := middleware.UserId(c)

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOneAndDelete(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "El usuario fue removido correctamente",
	})

}
