import { number, object, string, boolean } from "yup";

export const emailSchema = object().shape({
    email: string().trim()
    .email("Escriba una dirrección de correo electrónico válida")
    .min(1, "Por favor, escribe una dirección de correo electrónico")
    .required("Por favor, escribe una dirección de correo electrónico"),
})

export const profileSchema = object().shape({
    weddings:  number().transform((value, originalValue) => (originalValue === "" ? null : value)).nullable()
    .integer('Asegúrate de haber escrito un número entero')
    .min(0, 'Debe ser un número mayor o igual a 0'),
	divorces:  number().transform((value, originalValue) => (originalValue === "" ? null : value)).nullable()
    .integer('Asegúrate de haber escrito un número entero')
    .min(0, 'Debe ser un número mayor o igual a 0'),
	children:  number().transform((value, originalValue) => (originalValue === "" ? null : value)).nullable()
    .integer('Asegúrate de haber escrito un número entero')
    .min(0, 'Debe ser un número mayor o igual a 0'),
    death: boolean().oneOf([true, false], 'Error de validación'),
    isWeddings: boolean().oneOf([true, false], 'Error de validación'),
    isDivorces: boolean().oneOf([true, false], 'Error de validación'),
    isChildren: boolean().oneOf([true, false], 'Error de validación')
})