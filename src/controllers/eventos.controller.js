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
        const idEvento = req.params.id;

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

        const categoria = await prisma.categoria.findUnique({
            where: { id: categoriaId },
            select: { id: true }
        });

        if (!categoria) {
            const error = new Error("La categoría indicada no existe.");

            error.status = 400;
            return next(error);
        }

        const nuevoEvento = await prisma.evento.create({
            data: {
                nombre,
                descripcion,
                lugar,
                fecha,
                categoria: {
                    connect: { id: categoriaId }
                }
            }
        });
        return res.status(201).json(nuevoEvento);
    } catch (error) {
        return next(error);
    }
};

export const actualizarEvento = async (req, res, next) => {
    try {
        const idEvento = req.params.id;
        const {
            nombre,
            descripcion,
            lugar,
            fecha,
            categoriaId
        } = req.body;

        const categoria = await prisma.categoria.findUnique({
            where: { id: categoriaId },
            select: { id: true }
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
                nombre,
                descripcion,
                lugar,
                fecha,
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
        const idEvento = req.params.id;

        await prisma.evento.delete({
            where: { id: idEvento }
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
