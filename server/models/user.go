package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserModel struct {
	Id        primitive.ObjectID  `json:"_id,omitempty" bson:"_id,omitempty"`
	Email     string              `json:"email,omitempty" bson:"email,omitempty" mson:"cunique"`
	IsMarried bool                `json:"isMarried,omitempty" bson:"isMarried,omitempty"`
	Status    bool                `json:"status,omitempty" bson:"status,omitempty"`
	IsAdd     bool                `json:"isAdd,omitempty" bson:"isAdd,omitempty"`
	Ancestry  []AncestryUserModel `json:"ancestry" bson:"ancestry" mson:"collection=AncestryUserModel"`
	Role      primitive.ObjectID  `json:"role" bson:"role" mson:"collection=RoleModel"`
	CreatedAt primitive.DateTime  `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime  `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type CreateUserModel struct {
	Email string `json:"email,omitempty" bson:"email,omitempty" validate:"required"`
}

type CodeUserModel struct {
	Code string `json:"code,omitempty" bson:"code,omitempty" validate:"required"`
}

type LoginModel struct {
	Email    string `json:"email,omitempty" bson:"email,omitempty" validate:"required" mson:"cunique"`
	Password string `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
}

type ContactModel struct {
	Name    string `json:"name,omitempty" bson:"name,omitempty" validate:"required"`
	Email   string `json:"email,omitempty" bson:"email,omitempty" validate:"required"`
	Message string `json:"message,omitempty" bson:"message,omitempty" validate:"required"`
}
