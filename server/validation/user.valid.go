package validation

import (
	"github.com/EmanuelCav/civistano_platform/connections"
	"github.com/EmanuelCav/civistano_platform/context"
	"github.com/EmanuelCav/civistano_platform/helper"
	"github.com/EmanuelCav/civistano_platform/models"
	"go.mongodb.org/mongo-driver/bson"
)

func RoleValid(role models.CreateRoleModel) string {

	var roleValid models.RoleModel

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionRole().FindOne(ctx, bson.M{"role": role.Role}).Decode(&roleValid)

	if err == nil {
		if roleValid.Role == role.Role {
			return "Role has been already registered"
		}
	}

	if !helper.ValidateString(role.Role) {
		return "Role only accepts letters"
	}

	return ""

}

func RegisterValid(user models.CreateUserModel) string {

	var userValid models.UserModel

	if len(user.Password) <= 7 {
		return "The password must has more than 7 characters"
	}

	if user.Password != user.Confirm {
		return "The passwords do not match"
	}

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionUser().FindOne(ctx, bson.M{"email": user.Email}).Decode(&userValid)

	if err == nil {
		if userValid.Email == user.Email {
			return "The email has been already registered"
		}
	}

	if !helper.ValidateEmail(user.Email) {
		return "The email is not valid"
	}

	return ""

}

func LoginValid(user models.LoginModel) string {

	var userValid models.UserModel

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionUser().FindOne(ctx, bson.M{"email": user.Email}).Decode(&userValid)

	if err != nil {
		return "Fields do not match"
	}

	if !helper.CompareHash(userValid.Password, user.Password) {
		return "Fields do not match"
	}

	return ""
}
