import {
    registrarUsuarioSchema,
    iniciarSesionSchema
} from "../validators/usuarios.schemas.js";

export const validarRegistroUsuario = (req, res, next) => {
    const resultado = registrarUsuarioSchema.safeParse(
        req.body
    );

    if (!resultado.success) {
        return res.status(400).json({
            mensaje: "Los datos enviados son inválidos.",
            errores: resultado.error.issues
        });
    }

    req.registrarUsuarioDto = resultado.data;

    return next();
};

export const validarInicioSesion = (
    req,
    res,
    next
) => {
    const resultado =
        iniciarSesionSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensaje:
                "Los datos enviados son inválidos.",
            errores: resultado.error.issues
        });
    }

    req.iniciarSesionDto = resultado.data;

    return next();
};