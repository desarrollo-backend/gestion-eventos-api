import express from "express";

import { registrarUsuario, iniciarSesion } from "../controllers/usuarios.controller.js";

import { validarRegistroUsuario, validarInicioSesion } from "../middlewares/usuarios.middleware.js";

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

export default router;