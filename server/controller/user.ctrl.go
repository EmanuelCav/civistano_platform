package controller

import (
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

	var photocopies models.ChecklistModel
	var birthCertificate models.ChecklistModel
	var services models.ChecklistModel
	var test models.ChecklistModel
	var confirmation models.ChecklistModel
	var application models.ChecklistModel
	var statement models.ChecklistModel
	var shift models.ChecklistModel
	var pay models.ChecklistModel
	var naturalization models.ChecklistModel
	var background models.ChecklistModel

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
			"message": "Hay campos vacios. Por favor completa",
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

	userId := primitive.NewObjectID()

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "DOS FOTOCOPIAS DEL DNI DE AMBOS LADOS"}).Decode(&photocopies); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "ACTA DE NACIMIENTO TRADUCIDA AL ITALIANO"}).Decode(&birthCertificate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "COMPLETAR LA DECLARACIÓN"}).Decode(&statement); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "COMPLETAR EL FORMULARIO DE SOLICITUD"}).Decode(&application); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "TRANSFERENCIA BANCARIA Y COMPROBANTE DE PAGO"}).Decode(&pay); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx,
		bson.M{"title": "FACTURA DE SERVICIO QUE ACREDITE UNA RESIDENCIA MÍNIMA DE 6 MESES EN LA CIRCUNSCRIPCIÓN CONSULAR CORRESPONDIENTE"}).Decode(&services); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx,
		bson.M{"title": "AGENDAR TURNO"}).Decode(&shift); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx,
		bson.M{"title": "ME CONFIRMARON EL TURNO"}).Decode(&confirmation); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if ancestry.Ancestry == "CÓNYUGE" {
		if err := connections.ConnectionChecklist().FindOne(ctx,
			bson.M{"title": "COMPROBANTE DE IDIOMA ITALIANO (B1 INTERMEDIO)"}).Decode(&test); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		if err := connections.ConnectionChecklist().FindOne(ctx,
			bson.M{"title": "CERTIFICADO DE ANTECEDENTES PENALES TRADUCIDO AL ITALIANO"}).Decode(&background); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}
	}

	if ancestry.Hierarchy > 1 {
		if err := connections.ConnectionChecklist().FindOne(ctx,
			bson.M{"title": "CERTIFICADO DE NO NATURALIZACIÓN"}).Decode(&naturalization); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}
	}

	var newAncestryYou models.AncestryUserModel

	if ancestry.Ancestry == "CÓNYUGE" {
		newAncestryYou = models.AncestryUserModel{
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
			Checklist: []models.ChecklistUserModel{
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: shift,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: confirmation,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: birthCertificate,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: photocopies,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: background,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: statement,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: application,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: services,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: test,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: pay,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
			},
			Weddings:  0,
			Divorces:  0,
			Children:  0,
			Death:     false,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
	} else {
		newAncestryYou = models.AncestryUserModel{
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
			Checklist: []models.ChecklistUserModel{
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: shift,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: confirmation,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: birthCertificate,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: photocopies,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: statement,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: application,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: services,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: pay,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
			},
			Weddings:  0,
			Divorces:  0,
			Children:  0,
			Death:     false,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
	}

	var newAncestryUser models.AncestryUserModel

	if ancestry.Hierarchy > 1 {
		newAncestryUser = models.AncestryUserModel{
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
			Checklist: []models.ChecklistUserModel{
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: birthCertificate,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: naturalization,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
			},
			Weddings:  0,
			Divorces:  0,
			Children:  0,
			Death:     false,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
	} else {
		newAncestryUser = models.AncestryUserModel{
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
			Checklist: []models.ChecklistUserModel{},
			Weddings:  0,
			Divorces:  0,
			Children:  0,
			Death:     false,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
	}

	newUser := models.UserModel{
		Id:    userId,
		Email: user.Email,
		Role:  roleUser.Id,
		IsAdd: true,
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

	var birthCertificate models.ChecklistModel
	var naturalization models.ChecklistModel

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

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "ACTA DE NACIMIENTO TRADUCIDA AL ITALIANO"}).Decode(&birthCertificate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "CERTIFICADO DE NO NATURALIZACIÓN"}).Decode(&naturalization); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	var newAncestryUser models.AncestryUserModel

	if ancestry.Hierarchy > 1 {
		newAncestryUser = models.AncestryUserModel{
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
			Checklist: []models.ChecklistUserModel{
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: birthCertificate,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
				{
					Id:        primitive.NewObjectID(),
					User:      userId,
					IsChecked: false,
					Checklist: naturalization,
					CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
					UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
				},
			},
			Weddings:  0,
			Divorces:  0,
			Children:  0,
			Death:     false,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
	} else {
		if user.Ancestry[0].Ancestry.Ancestry == config.Config()["ancestryYou"] {
			newAncestryUser = models.AncestryUserModel{
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
				Checklist: []models.ChecklistUserModel{},
				Weddings:  0,
				Divorces:  0,
				Children:  0,
				Death:     false,
				CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
				UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
			}
		} else {
			newAncestryUser = models.AncestryUserModel{
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
				Checklist: []models.ChecklistUserModel{
					{
						Id:        primitive.NewObjectID(),
						User:      userId,
						IsChecked: false,
						Checklist: birthCertificate,
						CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
						UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
					},
				},
				Weddings:  0,
				Divorces:  0,
				Children:  0,
				Death:     false,
				CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
				UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
			}
		}
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

	var children models.ChecklistModel
	var divorces models.ChecklistModel
	var weddings models.ChecklistModel
	var diffusion models.ChecklistModel

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

	var checklistUser []models.ChecklistUserModel

	var mainCheck int

	if user.Ancestry[0].Ancestry.Ancestry == "CÓNYUGE" {
		mainCheck = 10
	} else {
		mainCheck = 8
	}

	if user.Ancestry[ancestryUserIndex].Ancestry.Ancestry != "CÓNYUGE" {
		if user.Ancestry[ancestryUserIndex].Ancestry.Ancestry == config.Config()["ancestryYou"] {
			for i := 0; i < mainCheck; i++ {
				checklistUser = append(checklistUser, user.Ancestry[ancestryUserIndex].Checklist[i])
			}
		} else {
			if ancestryUserIndex == 0 {
				for i := 0; i < 2; i++ {
					checklistUser = append(checklistUser, user.Ancestry[ancestryUserIndex].Checklist[i])
				}
			} else {
				checklistUser = append(checklistUser, user.Ancestry[ancestryUserIndex].Checklist[0])
			}
		}
	}

	for i := 0; i < ancestryUpdate.Children; i++ {

		if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "ACTA DE NACIMIENTO DE HIJOS MENORES DE EDAD TRADUCIDA AL ITALIANO"}).Decode(&children); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		checklistUser = append(checklistUser, models.ChecklistUserModel{
			Id:        primitive.NewObjectID(),
			User:      userId,
			IsChecked: false,
			Checklist: children,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		})
	}

	for i := 0; i < ancestryUpdate.Divorces; i++ {

		if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "SENTENCIA DE DIVORCIO TRADUCIDA AL ITALIANO"}).Decode(&divorces); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		checklistUser = append(checklistUser, models.ChecklistUserModel{
			Id:        primitive.NewObjectID(),
			User:      userId,
			IsChecked: false,
			Checklist: divorces,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		})
	}

	for i := 0; i < ancestryUpdate.Weddings; i++ {

		if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "ACTA DE MATRIMONIO TRADUCIDA AL ITALIANO"}).Decode(&weddings); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		checklistUser = append(checklistUser, models.ChecklistUserModel{
			Id:        primitive.NewObjectID(),
			User:      userId,
			IsChecked: false,
			Checklist: weddings,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		})
	}

	if ancestryUpdate.Death {

		if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"title": "ACTA DE DEFUCIÓN TRADUCIDA AL ITALIANO"}).Decode(&diffusion); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}

		checklistUser = append(checklistUser, models.ChecklistUserModel{
			Id:        primitive.NewObjectID(),
			User:      userId,
			IsChecked: false,
			Checklist: diffusion,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		})
	}

	if len(checklistUser) == 0 {
		user.Ancestry[ancestryUserIndex] = models.AncestryUserModel{
			Id:        user.Ancestry[ancestryUserIndex].Id,
			Ancestry:  user.Ancestry[ancestryUserIndex].Ancestry,
			Checklist: []models.ChecklistUserModel{},
			Weddings:  ancestryUpdate.Weddings,
			Children:  ancestryUpdate.Children,
			Divorces:  ancestryUpdate.Divorces,
			Death:     ancestryUpdate.Death,
			CreatedAt: user.Ancestry[ancestryUserIndex].CreatedAt,
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
	} else {
		user.Ancestry[ancestryUserIndex] = models.AncestryUserModel{
			Id:        user.Ancestry[ancestryUserIndex].Id,
			Ancestry:  user.Ancestry[ancestryUserIndex].Ancestry,
			Checklist: checklistUser,
			Weddings:  ancestryUpdate.Weddings,
			Children:  ancestryUpdate.Children,
			Divorces:  ancestryUpdate.Divorces,
			Death:     ancestryUpdate.Death,
			CreatedAt: user.Ancestry[ancestryUserIndex].CreatedAt,
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}
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

	if err := connections.ConnectionUser().FindOneAndDelete(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "El usuario fue removido correctamente",
	})

}

func RestartUser(c *fiber.Ctx) error {

	var user models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

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

	if len(user.Ancestry) > 1 {
		user.Ancestry = user.Ancestry[len(user.Ancestry)-1:]

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

		if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": err.Error(),
			})
		}
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "Se ha restaurado exitosamente",
		"user":    user,
	})

}

func RemoveLastAncestry(c *fiber.Ctx) error {

	var user models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

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

	user.Ancestry = user.Ancestry[1:]

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

	if err := connections.ConnectionUser().FindOne(ctx, bson.M{"_id": userId}).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "El ancestro se ha eliminado exitosamente",
		"user":    user,
	})

}

func Contact(c *fiber.Ctx) error {

	var contact models.ContactModel

	if err := c.BodyParser(&contact); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	if err := helper.Validate().Struct(&contact); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Hay campos vacios. Por favor completa",
		})
	}

	utils.SendMessage(contact.Name, contact.Email, contact.Email)

	return c.Status(fiber.StatusAccepted).JSON(&fiber.Map{
		"message": "Mensaje enviado correctamente. Nos contactaremos en breve.",
	})

}

func CheckAncestryUser(c *fiber.Ctx) error {

	var ancestry models.AncestryModel
	var checklist models.ChecklistModel
	var user models.UserModel
	var userUpdated models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	aid := c.Params("aid")
	cid := c.Params("cid")

	ancestryId, err := primitive.ObjectIDFromHex(aid)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	checklistId, err2 := primitive.ObjectIDFromHex(cid)

	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err2.Error(),
		})
	}

	userId, err3 := middleware.UserId(c)

	if err3 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err3.Error(),
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

	if err := connections.ConnectionChecklist().FindOne(ctx, bson.M{"_id": checklistId}).Decode(&checklist); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	for i := 0; i < len(user.Ancestry); i++ {
		if user.Ancestry[i].Ancestry.Ancestry == ancestry.Ancestry {
			for j := 0; j < len(user.Ancestry[i].Checklist); j++ {
				if user.Ancestry[i].Checklist[j].Checklist.Title == checklist.Title {
					user.Ancestry[i].Checklist[j].IsChecked = !user.Ancestry[i].Checklist[j].IsChecked
					break
				}
			}
			break
		}
	}

	update := bson.M{
		"$set": bson.M{
			"ancestry": user.Ancestry,
		},
	}

	_, err4 := connections.ConnectionUser().UpdateOne(ctx, bson.M{"_id": userId}, update)

	if err4 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err4.Error(),
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
