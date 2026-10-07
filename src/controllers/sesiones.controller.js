import { revocarToken }
  from "../services/revocaciones.service.js";

export const cerrarSesion = async (req, res, next) => {
  try {
    await revocarToken(req.usuario);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
