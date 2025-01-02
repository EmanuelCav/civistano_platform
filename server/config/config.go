package config

import (
	"os"
)

func Config() map[string]string {

	// envFile, err := godotenv.Read(".env")

	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	variables := make(map[string]string)

	variables["port"] = os.Getenv("PORT")
	variables["database"] = os.Getenv("DATABASE")
	variables["uri"] = os.Getenv("MONGO_URI")
	variables["userCollection"] = os.Getenv("USER_COLLECTION")
	variables["roleCollection"] = os.Getenv("ROLE_COLLECTION")
	variables["ancestryCollection"] = os.Getenv("ANCESTRY_COLLECTION")
	variables["ancestryUserCollection"] = os.Getenv("ANCESTRY_USER_COLLECTION")
	variables["provinceCollection"] = os.Getenv("PROVINCE_COLLECTION")
	variables["linkCollection"] = os.Getenv("LINK_COLLECTION")
	variables["checklistCollection"] = os.Getenv("CHECKLIST_COLLECTION")
	variables["defaultRole"] = os.Getenv("DEFAULT_ROLE")
	variables["privilegedRole"] = os.Getenv("PRIVILEGED_ROLE")
	variables["ancestryYou"] = os.Getenv("ANCESTRY_YOU")
	variables["jwt"] = os.Getenv("JWT")
	variables["jwt_login"] = os.Getenv("JWT_LOGIN")
	variables["myPass"] = os.Getenv("MY_PASS")
	variables["myHost"] = os.Getenv("MY_HOST")
	variables["myMail"] = os.Getenv("MY_MAIL")
	variables["myPort"] = os.Getenv("MY_PORT")

	return variables

}
