import express from "express";
import {
    obtenerEventos,
    obtenerEventosFiltrados,
    obtenerEventoPorId,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} from "../controllers/eventos.controller.js";

// Middleware aplicado a un recurso específico
function verificarAcceso(req, res, next) {
    console.log("Verificando acceso...");
    next();
}

const router = express.Router();

// En Express, las rutas se evalúan en orden. Las rutas más específicas van antes, y las rutas dinámicas como /eventos/:id van después. 
router.get("/", obtenerEventos);
router.get("/filtrados", obtenerEventosFiltrados);
router.get("/:id", obtenerEventoPorId);
router.post("/", verificarAcceso, crearEvento);
router.put("/:id", verificarAcceso, actualizarEvento);
router.delete("/:id", verificarAcceso, eliminarEvento);

export default router;