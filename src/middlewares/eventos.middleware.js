import {
    crearEventoSchema,
    consultarEventosSchema
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

export const validarConsultaEventos = (
    req,
    res,
    next
) => {
    const resultado =
        consultarEventosSchema.safeParse(req.query);

    if (!resultado.success) {
        return res.status(400).json({
            mensaje:
                "Los parámetros de consulta son inválidos.",
            errores: resultado.error.issues
        });
    }

    req.consultaEventos = resultado.data;

    return next();
};