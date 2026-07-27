import express from "express"
import eventosRoutes from "./routes/eventos.routes.js";

const app = express();
const PORT = 3000;

// Middleware incorporado por Express
app.use(express.json());

// Nuestro primer middleware
app.use((req, res, next) => {
    console.log(`Datos de la solicitud: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => { 
    res.json({
        mensaje: 'API de Gestión de Eventos!!',
        version: '1.0'
    });
});    

app.use("/eventos", eventosRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error("Error capturado por el middleware:");
    console.error(err.message);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        mensaje: err.message || "Ha ocurrido un error interno."
    });
});

app.listen(PORT, () => { 
    console.log(`Servidor iniciado en puerto ${PORT}`);
});