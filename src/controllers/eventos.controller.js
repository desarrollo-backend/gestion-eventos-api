import prisma from "../config/prisma.js";

const eventos = [
    {
        id: 1,
        nombre: "Congreso de Tecnologia",
        lugar: "Auditorio Principal"
    },
    {
        id: 2,
        nombre: "Workshop de Node.js",
        lugar: "Laboratorio de Informatica"
    }
];

export const obtenerEventos =
    async (req, res, next) => {
        try {
            const eventosPersistidos =
                await prisma.evento.findMany();

            return res.json(eventosPersistidos);
        } catch (error) {
            return next(error);
        }
    };

export const obtenerEventosFiltrados = (req, res) => {
    const lugar = req.query.lugar;

    const eventosFiltrados = eventos.filter(
        evento => evento.lugar.includes(lugar)
    );

    res.json(eventosFiltrados);
};

export const obtenerEventoPorId = (req, res, next) => {
    const id = parseInt(req.params.id);

    const evento = eventos.find(
        e => e.id === id
    );

    if (!evento) {
        const error = new Error("El evento no existe.");
        error.status = 404;

        return next(error);
    }

    res.json(evento);
}

export const crearEvento = (req, res, next) => {
    if (!req.body.nombre || !req.body.lugar) {
        const error = new Error(
            "Los campos 'nombre' y 'lugar' son obligatorios."
        );

        error.status = 400;

        return next(error);
    }

    const nuevoEvento = {
        id: eventos.length + 1,
        nombre: req.body.nombre,
        lugar: req.body.lugar
    };

    eventos.push(nuevoEvento);

    res.status(201).json(nuevoEvento);
};

export const actualizarEvento = (req, res, next) => {
    const idEvento = parseInt(req.params.id);

    const evento = eventos.find(
        e => e.id === idEvento
    );

    if (!evento) {
        const error = new Error("El evento no existe.");
        error.status = 404;

        return next(error);
    }

    if (!req.body.nombre || !req.body.lugar) {
        const error = new Error(
            "Los campos 'nombre' y 'lugar' son obligatorios."
        );

        error.status = 400;

        return next(error);
    }

    evento.nombre = req.body.nombre;
    evento.lugar = req.body.lugar;

    res.json(evento);
};

export const eliminarEvento = (req, res, next) => {
    const idEvento = parseInt(req.params.id);

    const indice = eventos.findIndex(
        e => e.id === idEvento
    );

    if (indice === -1) {
        const error = new Error("El evento no existe.");
        error.status = 404;

        return next(error);
    }

    eventos.splice(indice, 1);

    res.status(204).send();
};