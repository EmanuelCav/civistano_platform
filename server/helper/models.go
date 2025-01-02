package helper

import (
	"log"

	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/models"
	"go.mongodb.org/mongo-driver/bson"
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
