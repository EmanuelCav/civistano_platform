package utils

import (
	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/database"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCollection(collectioName string) *mongo.Collection {

	collection := database.DatabaseConnection().Database(config.Config()["database"]).Collection(collectioName)

	return collection

}
