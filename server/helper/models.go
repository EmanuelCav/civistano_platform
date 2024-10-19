package helper

import (
	"log"
	"time"

	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ShowChecklists(areUserParents bool) []models.ChecklistModel {

	var checklists []models.ChecklistModel

	ctx, cancel := context.Context()
	defer cancel()

	cursor, err := connections.ConnectionChecklist().Find(ctx, bson.M{})

	if err != nil {
		log.Fatal("Error to get Checklist")
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var checklist models.ChecklistModel

		if err := cursor.Decode(&checklist); err != nil {
			log.Fatal("Error to get Checklist")
		}

		if areUserParents {
			if checklist.AreParents {
				checklists = append(checklists, checklist)
			}
		} else {
			if !checklist.AreParents {
				checklists = append(checklists, checklist)
			}
		}

	}

	return checklists
}

func ChecklistAncestry(id primitive.ObjectID, areParents bool) []models.ChecklistUserModel {

	var userChecklist []models.ChecklistUserModel
	checklists := ShowChecklists(areParents)

	for i := 0; i < len(checklists); i++ {
		userChecklist = append(userChecklist, models.ChecklistUserModel{
			Id:        primitive.NewObjectID(),
			User:      id,
			Checklist: checklists[i].Id,
			IsChecked: false,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		})
	}

	return userChecklist
}
