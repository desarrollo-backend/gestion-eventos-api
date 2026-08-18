import { validationResult } from "express-validator";

export const controlarErroresValidacion = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: "La solicitud contiene datos inválidos.",
            errores: errores.array().map((error) => ({
                campo: error.path,
                mensaje: error.msg,
                ubicacion: error.location
            }))
        });
    }
    return next();
};