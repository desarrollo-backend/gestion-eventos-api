import express from "express";

import { registrarUsuario, iniciarSesion, obtenerMiPerfil } from "../controllers/usuarios.controller.js";

import { validarRegistroUsuario, validarInicioSesion } from "../middlewares/usuarios.middleware.js";

import { autenticarUsuario } from "../middlewares/autenticacion.middleware.js";

import { cerrarSesion } from "../controllers/sesiones.controller.js";


const router = express.Router();

router.post(
    "/registro",
    validarRegistroUsuario,
    registrarUsuario
);

router.post(
    "/login",
    validarInicioSesion,
    iniciarSesion
);

router.get(
  "/me",
  autenticarUsuario,
  obtenerMiPerfil
);

router.post(
    "/logout", 
    autenticarUsuario, 
    cerrarSesion
);

export default router;