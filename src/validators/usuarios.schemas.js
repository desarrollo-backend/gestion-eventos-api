import { z } from "zod";

export const registrarUsuarioSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres."),

    email: z.email(
        "El email no tiene un formato válido."
    ),

    password: z
        .string()
        .min(
            8,
            "La contraseña debe tener al menos 8 caracteres."
        )
});

export const iniciarSesionSchema = z.object({
    email: z.email(
        "El email no tiene un formato válido."
    ),

    password: z
        .string()
        .min(
            1,
            "La contraseña es obligatoria."
        )
});