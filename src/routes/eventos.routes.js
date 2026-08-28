import express from "express";
import {
    obtenerEventos,
    obtenerEventosFiltrados,
    obtenerEventoPorId,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} from "../controllers/eventos.controller.js";

import {
    validarCreacionEvento
} from "../middlewares/eventos.middleware.js";

const router = express.Router();

// En Express, las rutas se evalúan en orden. Las rutas más específicas van antes, y las rutas dinámicas como /eventos/:id van después.
router.get("/", obtenerEventos);
router.get("/filtrados", obtenerEventosFiltrados);
router.post(
    "/",
    validarCreacionEvento,
    crearEvento
);
router.get("/:id", obtenerEventoPorId);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export default router;
