package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ProvinceModel struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Country   string             `json:"country,omitempty" bson:"country,omitempty"`
	Province  string             `json:"province,omitempty" bson:"province,omitempty"`
	CreatedAt primitive.DateTime `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateProvinceModel struct {
	Province string `json:"province,omitempty" bson:"province,omitempty" validate:"required"`
	Country  string `json:"country,omitempty" bson:"country,omitempty" validate:"required"`
}
