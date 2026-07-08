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

export const obtenerEventos = (req, res) => {
    res.json(eventos);
};

export const obtenerEventosFiltrados = (req, res) => {
    const lugar = req.query.lugar;

    const eventosFiltrados = eventos.filter(
        evento => evento.lugar.includes(lugar)
    );

    res.json(eventosFiltrados);
};

export const obtenerEventoPorId = (req, res) => {
    const id = parseInt(req.params.id);

    const evento = eventos.find(
        e => e.id === id
    );

    res.json(evento);
};

export const crearEvento = (req, res) => {
    const nuevoEvento = {
        id: eventos.length + 1,
        nombre: req.body.nombre,
        lugar: req.body.lugar
    };

    eventos.push(nuevoEvento);

    res.status(201).json(nuevoEvento);
};

export const actualizarEvento = (req, res) => {
    const idEvento = parseInt(req.params.id);

    const evento = eventos.find(
        e => e.id === idEvento
    );

    evento.nombre = req.body.nombre;
    evento.lugar = req.body.lugar;

    res.json(evento);
};

export const eliminarEvento = (req, res) => {
    const idEvento = parseInt(req.params.id);

    const indice = eventos.findIndex(
        e => e.id === idEvento
    );

    eventos.splice(indice, 1);

    res.status(204).send();
};