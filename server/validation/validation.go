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

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionUser().FindOne(ctx, bson.M{"email": user.Email}).Decode(&userValid)

	if err == nil {
		if userValid.Email == user.Email {
			return "Dirrección de correo electrónico no disponible"
		}
	}

	if !helper.ValidateEmail(user.Email) {
		return "Correo electrónico no valido"
	}

	return ""

}

func AncestryValid(ancestry models.CreateAncestryModel) string {

	var ancestryValid models.AncestryModel

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionAncestry().FindOne(ctx, bson.M{"ancestry": ancestry.Ancestry}).Decode(&ancestryValid)

	if err == nil {
		if ancestryValid.Ancestry == ancestry.Ancestry {
			return "Ancestry already exists"
		}
	}

	if !helper.ValidateUppercaseString(ancestry.Ancestry) {
		return "Ancestry only accepts uppercase letters"
	}

	return ""

}

func ProvinceValid(province models.CreateProvinceModel) string {

	var provinceValid models.ProvinceModel

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionProvince().FindOne(ctx, bson.M{"province": province.Province}).Decode(&provinceValid)

	if err == nil {
		if provinceValid.Province == province.Province {
			return "Province already exists"
		}
	}

	if !helper.ValidateString(province.Province) {
		return "Province only accepts letters"
	}

	return ""

}

func LinkValid(link models.CreateLinkModel) string {

	var linkValid models.LinkModel

	ctx, cancel := context.Context()
	defer cancel()

	err := connections.ConnectionLink().FindOne(ctx, bson.M{"link": link.Link}).Decode(&linkValid)

	if err == nil {
		if linkValid.Link == link.Link {
			return "Link already exists"
		}
	}

	if !helper.ValidateString(link.Link) {
		return "Link only accepts letters"
	}

	return ""

}
