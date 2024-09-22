package middleware

import (
	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func Auth() func(c *fiber.Ctx) error {
	return jwtware.New(jwtware.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Token malformed",
			})
		},
		SigningKey: jwtware.SigningKey{Key: []byte(config.Config()["jwt"])},
	})
}

func UserId(c *fiber.Ctx) (primitive.ObjectID, error) {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["id"].(string)

	id, err := primitive.ObjectIDFromHex(userId)

	return id, err
}

func Admin() func(c *fiber.Ctx) error {
	return jwtware.New(jwtware.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Token malformed",
			})
		},
		SigningKey: jwtware.SigningKey{Key: []byte(config.Config()["jwt"])},
		SuccessHandler: func(c *fiber.Ctx) error {

			ctx, cancel := context.Context()
			defer cancel()

			userId, err := UserId(c)

			if err != nil {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"message": "Not authorized",
				})
			}

			pipeline := mongo.Pipeline{
				{{"$match", bson.D{{"_id", userId}}}},
				{{"$lookup", bson.D{
					{"from", config.Config()["roleCollection"]},
					{"localField", "role"},
					{"foreignField", "_id"},
					{"as", "role"},
				}}},
				{{"$unwind", "$role"}},
			}

			cursor, err2 := connections.ConnectionUser().Aggregate(ctx, pipeline)

			if err2 != nil {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"message": "Not authorized",
				})
			}

			defer cursor.Close(ctx)

			var results []bson.M

			if err = cursor.All(ctx, &results); err != nil {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"message": "Not authorized",
				})
			}

			if roleMap, ok := results[0]["role"].(primitive.M); ok {
				if role, ok := roleMap["role"].(string); ok {
					if role != config.Config()["privilegedRole"] {
						return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
							"message": "Not authorized",
						})
					}
				}
			}

			return c.Next()
		},
	})
}
