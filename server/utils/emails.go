package utils

import (
	"fmt"
	"net/smtp"
)

func SendMail() {
	from := ""
	password := ""

	to := []string{"destinatario@example.com"}
	smtpHost := ""
	smtpPort := ""

	message := []byte("Subject: Prueba de correo\n" +
		"\n" +
		"Este es un mensaje de prueba enviado desde un programa en Go!")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		fmt.Println("Error al enviar el correo:", err)
		return
	}

	fmt.Println("Correo enviado exitosamente!")
}
