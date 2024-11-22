package utils

import (
	"log"
	"net/smtp"

	"github.com/EmanuelCav/civistano_platform/config"
)

func SendMail(email string, subject string) {
	from := config.Config()["myMail"]
	password := config.Config()["myPass"]

	to := []string{email}
	smtpHost := config.Config()["myHost"]
	smtpPort := config.Config()["myPort"]

	message := []byte("Subject: " + subject + " \n" +
		"\n" +
		"Este es un mensaje de prueba enviado desde un programa en Go!")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)

	if err != nil {
		log.Fatal(err)
	}
}
