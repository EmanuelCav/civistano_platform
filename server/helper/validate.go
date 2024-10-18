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

func ValidateUppercaseString(text string) bool {
	isString := regexp.MustCompile(`^[A-ZÑ]+$`).MatchString
	return isString(text)
}

func ValidateString(text string) bool {
	isString := regexp.MustCompile(`^[a-zA-ZñÑ ]+$`).MatchString
	return isString(text)
}

func Validate() *validator.Validate {
	return validator.New()
}
