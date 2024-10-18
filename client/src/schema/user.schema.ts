import { object, string } from "yup";

export const emailSchema = object().shape({
    email: string().trim()
    .email("Escriba una dirrección de correo electrónico válida")
    .min(1, "Por favor, escribe una dirección de correo electrónico")
    .required("Por favor, escribe una dirección de correo electrónico"),
})