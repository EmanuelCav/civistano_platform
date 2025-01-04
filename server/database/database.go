package database

import (
	"log"

	"github.com/EmanuelCav/civistano_platform/config"
	"github.com/EmanuelCav/civistano_platform/context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func DatabaseConnection() *mongo.Client {

	ctx, cancel := context.Context()
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.Config()["uri"]))

	if err != nil {
		log.Fatal(err)
	}

	err2 := client.Ping(ctx, readpref.Primary())

	if err2 != nil {
		log.Fatal(err2)
	}

	log.Println("Database is running")

	return client

}
