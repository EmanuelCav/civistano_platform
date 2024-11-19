package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type AncestryUserModel struct {
	Id        primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Firstname string               `json:"firstname,omitempty" bson:"firstname,omitempty"`
	Lastname  string               `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Ancestry  AncestryModel        `json:"ancestry" bson:"ancestry" mson:"collection=AncestryModel"`
	Checklist []primitive.ObjectID `json:"checklist" bson:"checklist" mson:"collection=ChecklistUserModel"`
	Weddings  int                  `json:"weddings,omitempty" bson:"weddings,omitempty"`
	Divorces  int                  `json:"divorces,omitempty" bson:"divorces,omitempty"`
	Children  int                  `json:"children,omitempty" bson:"children,omitempty"`
	Death     bool                 `json:"death,omitempty" bson:"death,omitempty"`
	CreatedAt primitive.DateTime   `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime   `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type AncestryModel struct {
	Id         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Ancestry   string             `json:"ancestry,omitempty" bson:"ancestry,omitempty" validate:"required" mson:"cunique"`
	Hierarchy  int                `json:"hierarchy,omitempty" bson:"hierarchy,omitempty"`
	IsFemale   bool               `json:"isFemale,omitempty" bson:"isFemale,omitempty"`
	AreParents bool               `json:"areParents,omitempty" bson:"areParents,omitempty"`
	IsHidden   bool               `json:"isHidden,omitempty" bson:"isHidden,omitempty"`
	CreatedAt  primitive.DateTime `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt  primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type UpdateAncestryUserModel struct {
	Weddings int  `json:"weddings,omitempty" bson:"weddings,omitempty"`
	Divorces int  `json:"divorces,omitempty" bson:"divorces,omitempty"`
	Children int  `json:"children,omitempty" bson:"children,omitempty"`
	Death    bool `json:"death,omitempty" bson:"death,omitempty"`
}

type CreateAncestryModel struct {
	Ancestry   string `json:"ancestry" bson:"ancestry" validate:"required" mson:"cunique"`
	Hierarchy  int    `json:"hierarchy" bson:"hierarchy"`
	IsFemale   bool   `json:"isFemale" bson:"isFemale"`
	AreParents bool   `json:"areParents" bson:"areParents"`
	IsHidden   bool   `json:"isHidden,omitempty" bson:"isHidden,omitempty"`
}
