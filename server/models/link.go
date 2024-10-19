package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type LinkModel struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Link      string             `json:"link,omitempty" bson:"link,omitempty"`
	Province  primitive.ObjectID `json:"province" bson:"province" mson:"collection=ProvinceModel"`
	Checklist primitive.ObjectID `json:"checklist" bson:"checklist" mson:"collection=ChecklistModel"`
	CreatedAt primitive.DateTime `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateLinkModel struct {
	Link string `json:"link,omitempty" bson:"link,omitempty" validate:"required"`
}
