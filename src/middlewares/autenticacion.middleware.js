import jwt from "jsonwebtoken";
import { verificarToken } from "../services/tokens.service.js";
import { tokenEstaRevocado } from "../services/revocaciones.service.js";

export const autenticarUsuario = async (req, res, next) => {
  const encabezado = req.get("Authorization");
  if (!encabezado) {
    res.set("WWW-Authenticate", "Bearer");
    return res.status(401).json({
      mensaje: "Se requiere un token de acceso."
    });
  }
  const coincidencia = /^Bearer +(\S+)$/i.exec(encabezado);
  if (!coincidencia) {
    res.set("WWW-Authenticate", 'Bearer error="invalid_request"');
    return res.status(400).json({
      mensaje: "Usar Authorization: Bearer <token>."
    });
  }
  try {
    req.usuario = verificarToken(coincidencia[1]);
    if (await tokenEstaRevocado(req.usuario.jti)) {
      throw new jwt.JsonWebTokenError("Token revocado.");
    }
  } catch (error) {
    if (!(error instanceof jwt.JsonWebTokenError)) {
      return next(error);
    }
    res.set("WWW-Authenticate", 'Bearer error="invalid_token"');
    return res.status(401).json({
      mensaje: "Token inválido, vencido o revocado."
    });
  }
  return next();
};
