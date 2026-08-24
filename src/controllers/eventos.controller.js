import prisma from "../config/prisma.js";

export const obtenerEventos = async (req, res, next) => {
    try {
        const eventosPersistidos = await prisma.evento.findMany();

        return res.json(eventosPersistidos);
    } catch (error) {
        return next(error);
    }
};

export const obtenerEventosFiltrados = async (req, res, next) => {
    try {
        const { lugar } = req.query;

        const eventosFiltrados = await prisma.evento.findMany({
            where: { lugar }
        });

        return res.json(eventosFiltrados);
    } catch (error) {
        return next(error);
    }
};

export const obtenerEventoPorId = async (req, res, next) => {
    try {
        const idEvento = Number(req.params.id);

        if (!Number.isInteger(idEvento) || idEvento <= 0) {
            const error = new Error(
                "El identificador del evento debe ser un entero positivo."
            );
            error.status = 400;
            return next(error);
        }

        const evento = await prisma.evento.findUnique({
            where: { id: idEvento },
            include: {
                categoria: true
            }
        });

        if (!evento) {
            const error = new Error("El evento no existe.");
            error.status = 404;
            return next(error);
        }

        return res.json(evento);
    } catch (error) {
        return next(error);
    }
};

export const crearEvento = async (req, res, next) => {
    try {
        const {
            nombre,
            descripcion,
            lugar,
            fecha,
            categoriaId
        } = req.body;

        if (
            !nombre ||
            !lugar ||
            !fecha ||
            !Number.isInteger(categoriaId) ||
            categoriaId <= 0
        ) {
            const error = new Error(
                "Nombre, lugar y fecha son obligatorios; " +
                "categoriaId debe ser un entero positivo."
            );

            error.status = 400;
            return next(error);
        }

        const fechaEvento = new Date(fecha);

        if (Number.isNaN(fechaEvento.getTime())) {
            const error = new Error(
                "La fecha del evento no es válida."
            );

            error.status = 400;
            return next(error);
        }

        const categoria = await prisma.categoria.findUnique({
            where: { id: categoriaId }
        });

        if (!categoria) {
            const error = new Error("La categoría indicada no existe.");

            error.status = 400;
            return next(error);
        }

        const nuevoEvento = await prisma.evento.create({
            data: {
                nombre: nombre.trim(),
                descripcion: descripcion?.trim() || null,
                lugar: lugar.trim(),
                fecha: fechaEvento,
                categoria: {
                    connect: { id: categoriaId }
                }
            },
            include: {
                categoria: true
            }
        });

        return res.status(201).json(nuevoEvento);
    } catch (error) {
        return next(error);
    }
};

export const actualizarEvento = async (req, res, next) => {
    try {
        const idEvento = Number(req.params.id);

        if (!Number.isInteger(idEvento) || idEvento <= 0) {
            const error = new Error(
                "El identificador debe ser un entero positivo."
            );

            error.status = 400;
            return next(error);
        }

        const {
            nombre,
            descripcion,
            lugar,
            fecha,
            categoriaId
        } = req.body;

        if (
            !nombre ||
            !lugar ||
            !fecha ||
            !Number.isInteger(categoriaId) ||
            categoriaId <= 0
        ) {
            const error = new Error(
                "Los datos del evento son inválidos."
            );

            error.status = 400;
            return next(error);
        }

        const fechaEvento = new Date(fecha);

        if (Number.isNaN(fechaEvento.getTime())) {
            const error = new Error(
                "La fecha del evento no es válida."
            );

            error.status = 400;
            return next(error);
        }

        const categoria = await prisma.categoria.findUnique({
            where: { id: categoriaId }
        });

        if (!categoria) {
            const error = new Error("La categoría indicada no existe.");
            error.status = 400;
            return next(error);
        }

        const eventoActualizado = await prisma.evento.update({
            where: {
                id: idEvento
            },
            data: {
                nombre: nombre.trim(),
                descripcion: descripcion?.trim() || null,
                lugar: lugar.trim(),
                fecha: fechaEvento,
                categoria: {
                    connect: { id: categoriaId }
                }
            },
            include: {
                categoria: true
            }
        });

        return res.json(eventoActualizado);
    } catch (error) {
        if (error.code === "P2025") {
            const errorNoEncontrado = new Error(
                "El evento no existe."
            );

            errorNoEncontrado.status = 404;
            return next(errorNoEncontrado);
        }

        return next(error);
    }
};

export const eliminarEvento = async (req, res, next) => {
    try {
        const idEvento = Number(req.params.id);

        if (!Number.isInteger(idEvento) || idEvento <= 0) {
            const error = new Error(
                "El identificador debe ser un entero positivo."
            );

            error.status = 400;
            return next(error);
        }

        await prisma.evento.delete({
            where: {
                id: idEvento
            }
        });

        return res.status(204).send();
    } catch (error) {
        if (error.code === "P2025") {
            const errorNoEncontrado = new Error(
                "El evento no existe."
            );

            errorNoEncontrado.status = 404;
            return next(errorNoEncontrado);
        }

        return next(error);
    }
};
