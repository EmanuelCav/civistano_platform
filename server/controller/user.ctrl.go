package controller

import (
	"time"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/helper"
	"github.com/EmanuelCav/civistano_platform/middleware"
	"github.com/EmanuelCav/civistano_platform/models"
	"github.com/EmanuelCav/civistano_platform/validation"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	pipeline := mongo.Pipeline{
		{
			{"$match", bson.D{{"_id", userId}}},
		},
		{
			{"$lookup", bson.D{
				{"from", config.Config()["ancestryUserCollection"]},
				{"localField", "ancestry"},
				{"foreignField", "_id"},
				{"as", "ancestry"},
			}},
		},
	}

	cursor, err := connections.ConnectionUser().Aggregate(ctx, pipeline)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "User not found",
		})
	}

	defer cursor.Close(ctx)

	if cursor.Next(ctx) {
		if err := cursor.Decode(&user); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "User not found",
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

	newAncestryYou := models.AncestryUserModel{
		Id:        primitive.NewObjectID(),
		Ancestry:  ancestry.Id,
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

	_, err1 := connections.ConnectionUserAncestry().InsertOne(ctx, newAncestryYou)

	if err1 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err1.Error(),
		})
	}

	newAncestryUser := models.AncestryUserModel{
		Id:        primitive.NewObjectID(),
		Ancestry:  ancestry.Id,
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
		Ancestry:  []models.AncestryUserModel{},
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

	updateYou := bson.M{
		"$push": bson.M{
			"ancestry": newAncestryYou.Id,
		},
	}

	updateAncestry := bson.M{
		"$push": bson.M{
			"ancestry": newAncestryUser.Id,
		},
	}

	// checklist := helper.ChecklistAncestry(newUser.Id, ancestry.AreParents)

	// updateChecklist := bson.M{
	// 	"$set": bson.M{
	// 		"checklist":  checklist,
	// 		"updated_at": primitive.NewDateTimeFromTime(time.Now()),
	// 	},
	// }

	_, err5 := connections.ConnectionUser().UpdateOne(ctx, bson.M{"_id": newUser.Id}, updateYou)

	if err5 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err5.Error(),
		})
	}

	_, err6 := connections.ConnectionUser().UpdateOne(ctx, bson.M{"_id": newUser.Id}, updateAncestry)

	if err6 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err6.Error(),
		})
	}

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": newUser.Id}).Decode(&userCreated); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

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
			"message": "Por favor, escribe un correo electrónico",
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

	token := helper.GenerateToken(userLoggedIn.Id)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"user":  userLoggedIn,
		"token": token,
	})

}
