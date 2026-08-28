import {
    crearEventoSchema
} from "../validators/eventos.schemas.js";

export const validarCreacionEvento = (req, res, next) => {
    const resultado = crearEventoSchema.safeParse(
        req.body
    );

    if (!resultado.success) {
        return res.status(400).json({
            mensaje: "Los datos enviados son inválidos.",
            errores: resultado.error.issues
        });
    }

    req.body = resultado.data;

    return next();
};