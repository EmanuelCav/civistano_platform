package helper

import (
	"net/mail"
	"regexp"

	"github.com/go-playground/validator/v10"
)

func ValidateEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func ValidateStringAndNumber(text string) bool {
	isStringNumber := regexp.MustCompile(`^[a-zA-Z0-9ñÑ ]+$`).MatchString
	return isStringNumber(text)
}

func ValidateString(text string) bool {
	isString := regexp.MustCompile(`^[a-zA-ZñÑ ]+$`).MatchString
	return isString(text)
}

func ValidateNumber(text string) bool {
	isNumber := regexp.MustCompile(`^[0-9]+$`).MatchString
	return isNumber(text)
}

func ValidateSomeCharacters(text string) bool {
	isSomeCharacters := regexp.MustCompile("^[^<>]+$").MatchString
	return isSomeCharacters(text)
}

func Validate() *validator.Validate {
	return validator.New()
}
