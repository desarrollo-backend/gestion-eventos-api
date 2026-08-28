import prisma from "../config/prisma.js";

export const crearEvento = async (crearEventoDto) => {
    const {
        nombre,
        descripcion,
        lugar,
        fecha,
        categoriaId
    } = crearEventoDto;

    const categoria = await prisma.categoria.findUnique({
        where: {
            id: categoriaId
        }
    });

    if (!categoria) {
        const error = new Error(
            "La categoría indicada no existe."
        );

        error.status = 400;
        throw error;
    }

    return prisma.evento.create({
        data: {
            nombre: nombre,
            descripcion: descripcion ?? null,
            lugar: lugar,
            fecha: fecha,
            categoria: {
                connect: {
                    id: categoriaId
                }
            }
        },
        include: {
            categoria: true
        }
    });
};
