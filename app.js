import express from "express"

const app = express();
const PORT = 3000;

const eventos = [
    {
        id: 1,
        nombre: 'Congreso de Tecnología',
        lugar: 'Auditorio Principal'
    },
    {
        id: 2,
        nombre: 'Workshop de Node.js',
        lugar: 'Laboratorio de Informática'
    }
]

app.use(express.json());

app.get('/', (req, res) => { 
    res.json({
        mensaje: 'API de Gestión de Eventos!!',
        version: '1.0'
    });
});    

app.get('/eventos', (req, res) => {
    res.json(eventos);
});

app.get('/eventos/filtrados', (req, res) => {
    const lugar = req.query.lugar;
    const eventosFiltrados = eventos.filter(
        evento => evento.lugar.includes(lugar)
    );
    res.json(eventosFiltrados);
});

// En Express, las rutas se evalúan en orden. Las rutas más específicas van antes, y las rutas dinámicas como /eventos/:id van después. 
app.get('/eventos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const evento = eventos.find(
        e => e.id === id
    );
    res.json(evento);
});

app.post('/eventos', (req, res) => {
    const nuevoEvento = {
        id: eventos.length + 1,
        nombre: req.body.nombre,
        lugar: req.body.lugar
    };
    eventos.push(nuevoEvento);
    res.status(201).json(nuevoEvento);
});

app.put('/eventos/:id', (req, res) => {
    const idEvento = parseInt(req.params.id)
    const evento = eventos.find(
	    e => e.id === idEvento 
    )
    evento.nombre = req.body.nombre
    evento.lugar = req.body.lugar
    res.json(evento);
});

app.delete('/eventos/:id', (req, res) => {
    const idEvento = parseInt(req.params.id)
    const indice = eventos.findIndex(
	    e => e.id === idEvento 
    );
    eventos.splice(indice, 1);
    res.status(204).send();
});

app.listen(PORT, () => { 
    console.log(`Servidor iniciado en puerto ${PORT}`);
});

