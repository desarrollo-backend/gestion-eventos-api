import {
    registrarUsuario as registrarUsuarioService,
    iniciarSesion as iniciarSesionService
} from "../services/usuarios.service.js";
import { generarToken } from "../services/tokens.service.js";
import { obtenerUsuarioPorId } from "../services/usuarios.service.js";


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

export const iniciarSesion = async (req, res, next) => {
  try {
    const usuario = await iniciarSesionService(
      req.iniciarSesionDto
    );
    const token = generarToken(usuario);
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      token: token,
      usuario: usuario
    });
  } catch (error) {
    return next(error);
  }
};

export const obtenerMiPerfil = async (req, res, next) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.usuario.id);
    if (!usuario) {
      res.set("WWW-Authenticate",
        'Bearer error="invalid_token"');
      return res.status(401).json({
        mensaje: "La cuenta asociada al token no existe."
      });
    }
    return res.status(200).json({ usuario: usuario });
  } catch (error) {
    return next(error);
  }
};
