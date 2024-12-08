package helper

import (
	"log"
	"time"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) string {

	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		log.Fatal(err)
	}

	return string(hash)
}

func CompareHash(hash string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateToken(id primitive.ObjectID) string {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        id,
		"ExpiresAt": time.Now().AddDate(0, 6, 0).Unix(),
	})

	tokenString, err := token.SignedString([]byte(config.Config()["jwt"]))

	if err != nil {
		log.Fatal(err)
	}

	return tokenString
}

func GenerateTokenLogin(code int, id primitive.ObjectID) string {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        id,
		"code":      code,
		"ExpiresAt": time.Now().Add(2 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString([]byte(config.Config()["jwt_login"]))

	if err != nil {
		log.Fatal(err)
	}

	return tokenString

}
