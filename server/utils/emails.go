package utils

import (
	"log"
	"net/smtp"

	"github.com/EmanuelCav/civistano_platform/config"
)

func SendMail(email string) {
	from := config.Config()["myMail"]
	password := config.Config()["myPass"]

	to := []string{email}
	smtpHost := config.Config()["myHost"]
	smtpPort := config.Config()["myPort"]

	message := []byte("Subject: ¡Bienvenido a Civistano!" + " \n" +
		"\n" +
		"Este es un mensaje de prueba enviado desde un programa en Go!")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)

	if err != nil {
		log.Fatal(err)
	}
}

func SendMailCode(email string, code string) {
	from := config.Config()["myMail"]
	password := config.Config()["myPass"]

	to := []string{email}
	smtpHost := config.Config()["myHost"]
	smtpPort := config.Config()["myPort"]

	message := []byte("Subject: Civistano: No replicar - Código de verificación: " + code + " \n" +
		"\n" +
		"El código de verificación para iniciar sesión es: " + code)

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)

	if err != nil {
		log.Fatal(err)
	}
}
