import express from "express";
import {
    obtenerEventos,
    obtenerEventoPorId,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} from "../controllers/eventos.controller.js";

import {
    validarCreacionEvento,
    validarConsultaEventos
} from "../middlewares/eventos.middleware.js";

const router = express.Router();

// En Express, las rutas se evalúan en orden. Las rutas más específicas van antes, y las rutas dinámicas como /eventos/:id van después.

// Consulta de la colección de eventos
router.get("/",validarConsultaEventos, obtenerEventos);

router.post(
    "/",
    validarCreacionEvento,
    crearEvento
);
router.get("/:id", obtenerEventoPorId);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export default router;
