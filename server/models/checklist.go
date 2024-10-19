package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChecklistModel struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title       string             `json:"title,omitempty" bson:"title,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	AreParents  bool               `json:"areParents,omitempty" bson:"areParents,omitempty"`
	CreatedAt   primitive.DateTime `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt   primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type ChecklistUserModel struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User      primitive.ObjectID `json:"user,omitempty" bson:"user,omitempty"`
	IsChecked bool               `json:"isChecked,omitempty" bson:"isChecked,omitempty"`
	Checklist primitive.ObjectID `json:"checklist" bson:"checklist" mson:"collection=ChecklistModel"`
	CreatedAt primitive.DateTime `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateChecklistModel struct {
	Title       string `json:"title,omitempty" bson:"title,omitempty" validate:"required"`
	Description string `json:"description,omitempty" bson:"description,omitempty" validate:"required"`
	AreParents  bool   `json:"areParents,omitempty" bson:"areParents,omitempty" validate:"required"`
}
