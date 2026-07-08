import express from "express";
import {
    obtenerEventos,
    obtenerEventosFiltrados,
    obtenerEventoPorId,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} from "../controllers/eventos.controller.js";

const router = express.Router();

router.get("/", obtenerEventos);
router.get("/filtrados", obtenerEventosFiltrados);
router.get("/:id", obtenerEventoPorId);
router.post("/", crearEvento);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export default router;