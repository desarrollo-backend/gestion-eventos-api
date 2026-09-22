import {
    registrarUsuario as registrarUsuarioService,
    iniciarSesion as iniciarSesionService
} from "../services/usuarios.service.js";

export const registrarUsuario = async (req, res, next) => {
    try {
        const registrarUsuarioDto =
            req.registrarUsuarioDto;

        const usuario = await registrarUsuarioService(
            registrarUsuarioDto
        );

        return res.status(201).json(usuario);
    } catch (error) {
        return next(error);
    }
};

export const iniciarSesion = async (
    req,
    res,
    next
) => {
    try {
        const usuario = await iniciarSesionService(
            req.iniciarSesionDto
        );

        return res.status(200).json({
            mensaje: "Credenciales verificadas correctamente.",
            usuario: usuario
        });
    } catch (error) {
        return next(error);
    }
};