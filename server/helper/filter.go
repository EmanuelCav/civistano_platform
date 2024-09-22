package helper

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UsersFilter() *options.FindOptions {
	filter := options.Find()
	filter.SetLimit(10)
	filter.SetProjection(bson.M{
		"password": 0,
	})

	return filter
}

func UserFilter() *options.FindOneOptions {
	filter := options.FindOne()
	filter.SetProjection(bson.M{
		"password": 0,
	})

	return filter
}
