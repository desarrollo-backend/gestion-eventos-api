import { body, param } from "express-validator";

export const validarIdEvento = [
    param("id")
        .isInt({ min: 1 })
        .withMessage(
            "El identificador del evento debe ser un entero positivo."
        )
        .toInt()
];

export const validarDatosEvento = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre del evento es obligatorio."),

    body("descripcion")
        .optional({ values: "null" })
        .isString()
        .withMessage("La descripción debe ser una cadena de texto.")
        .trim(),

    body("lugar")
        .trim()
        .notEmpty()
        .withMessage("El lugar del evento es obligatorio."),

    body("fecha")
        .isISO8601()
        .withMessage("La fecha debe tener un formato ISO 8601 válido.")
        .toDate(),

    body("categoriaId")
        .isInt({ min: 1 })
        .withMessage("categoriaId debe ser un entero positivo.")
        .toInt()
];
