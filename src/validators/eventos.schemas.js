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

export const consultarEventosSchema = z.object({
    lugar: z
        .string()
        .trim()
        .min(1)
        .optional(),

    categoriaId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    fechaDesde: z.iso
        .datetime({ offset: true })
        .transform((valor) => new Date(valor))
        .optional(),

    fechaHasta: z.iso
        .datetime({ offset: true })
        .transform((valor) => new Date(valor))
        .optional(),

    ordenPor: z
        .enum(["fecha", "nombre", "createdAt"])
        .default("fecha"),

    direccion: z
        .enum(["asc", "desc"])
        .default("asc"),

    pagina: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limite: z.coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(10)
}).refine(
    ({ fechaDesde, fechaHasta }) => {
        return (
            !fechaDesde ||
            !fechaHasta ||
            fechaDesde <= fechaHasta
        );
    },
    {
        message:
            "fechaDesde no puede ser posterior a fechaHasta.",
        path: ["fechaHasta"]
    }
);