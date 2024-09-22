package config

import (
	"log"

	"github.com/joho/godotenv"
)

func Config() map[string]string {

	envFile, err := godotenv.Read(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	variables := make(map[string]string)

	variables["port"] = envFile["PORT"]
	variables["database"] = envFile["DATABASE"]
	variables["uri"] = envFile["MONGO_URI"]
	variables["userCollection"] = envFile["USER_COLLECTION"]
	variables["roleCollection"] = envFile["ROLE_COLLECTION"]
	variables["defaultRole"] = envFile["DEFAULT_ROLE"]
	variables["privilegedRole"] = envFile["PRIVILEGED_ROLE"]
	variables["jwt"] = envFile["JWT"]

	return variables

}
