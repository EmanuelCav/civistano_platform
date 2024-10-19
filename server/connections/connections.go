package connections

import (
	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

func ConnectionUser() *mongo.Collection {
	return utils.GetCollection(config.Config()["userCollection"])
}

func ConnectionRole() *mongo.Collection {
	return utils.GetCollection(config.Config()["roleCollection"])
}

func ConnectionAncestry() *mongo.Collection {
	return utils.GetCollection(config.Config()["ancestryCollection"])
}

func ConnectionUserAncestry() *mongo.Collection {
	return utils.GetCollection(config.Config()["ancestryUserCollection"])
}

func ConnectionProvince() *mongo.Collection {
	return utils.GetCollection(config.Config()["provinceCollection"])
}

func ConnectionLink() *mongo.Collection {
	return utils.GetCollection(config.Config()["linkCollection"])
}

func ConnectionChecklist() *mongo.Collection {
	return utils.GetCollection(config.Config()["checklistCollection"])
}
