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
    validarDatosEvento,
    validarIdEvento
} from "../validators/eventos.validator.js";

import { controlarErroresValidacion } from "../middlewares/validarSolicitud.js";

const router = express.Router();

// En Express, las rutas se evalúan en orden. Las rutas más específicas van antes, y las rutas dinámicas como /eventos/:id van después.
router.get("/", obtenerEventos);
router.get("/filtrados", obtenerEventosFiltrados);
router.post(
    "/",
    validarDatosEvento,
    controlarErroresValidacion,
    crearEvento
);

router.get(
    "/:id",
    validarIdEvento,
    controlarErroresValidacion,
    obtenerEventoPorId
);

router.put(
    "/:id",
    validarIdEvento,
    validarDatosEvento,
    controlarErroresValidacion,
    actualizarEvento
);

router.delete(
    "/:id",
    validarIdEvento,
    controlarErroresValidacion,
    eliminarEvento
);

export default router;
