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

func ValidateNumber(text string) bool {
	isNumber := regexp.MustCompile(`^[0-9]*$`).MatchString
	return isNumber(text)
}

func ValidateUppercaseString(text string) bool {
	isString := regexp.MustCompile(`^[A-ZÑÁÉÍÓÚ]*$`).MatchString
	return isString(text)
}

func ValidateString(text string) bool {
	isString := regexp.MustCompile(`^[a-zA-ZñÑ ]+$`).MatchString
	return isString(text)
}

func Validate() *validator.Validate {
	return validator.New()
}
