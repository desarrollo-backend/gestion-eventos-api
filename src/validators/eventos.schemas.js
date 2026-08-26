import { z } from "zod";

export const crearEventoSchema = z.object({
    nombre: z.string().trim().min(1),

    descripcion: z
        .string()
        .trim()
        .min(1)
        .optional()
        .nullable(),

    lugar: z.string().trim().min(1),

    fecha: z.iso
        .datetime({ offset: true })
        .transform((valor) => new Date(valor)),

    categoriaId: z.number().int().positive()
});