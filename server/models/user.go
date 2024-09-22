package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserModel struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Firstname string             `json:"firstname,omitempty" bson:"firstname,omitempty" validate:"required"`
	Lastname  string             `json:"lastname,omitempty" bson:"lastname,omitempty" validate:"required"`
	Email     string             `json:"email,omitempty" bson:"email,omitempty" validate:"required" mson:"cunique"`
	Status    bool               `json:"status,omitempty" bson:"status,omitempty"`
	Password  string             `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
	Role      primitive.ObjectID `json:"role" bson:"role" mson:"collection=RoleModel"`
	CreatedAt primitive.DateTime `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateUserModel struct {
	Firstname string `json:"firstname,omitempty" bson:"firstname,omitempty" validate:"required"`
	Lastname  string `json:"lastname,omitempty" bson:"lastname,omitempty" validate:"required"`
	Email     string `json:"email,omitempty" bson:"email,omitempty" validate:"required" mson:"cunique"`
	Role      string `json:"role" bson:"role"`
	Password  string `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
	Confirm   string `json:"confirm,omitempty" bson:"confirm,omitempty" validate:"required"`
}

type LoginModel struct {
	Email    string `json:"email,omitempty" bson:"email,omitempty" validate:"required" mson:"cunique"`
	Password string `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
}
