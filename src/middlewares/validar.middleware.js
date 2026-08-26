export const validar = (schema, origen) => {
    return (req, res, next) => {
        const resultado = schema.safeParse(
            req[origen]
        );

        if (!resultado.success) {
            return res.status(400).json({
                mensaje: "Los datos enviados son inválidos.",
                errores: resultado.error.issues
            });
        }

        req.datosValidados ??= {};
        req.datosValidados[origen] = resultado.data;

        return next();
    };
};