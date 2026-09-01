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

export const consultarEventos = async (criteriosConsulta) => {
    const {
        lugar,
        categoriaId,
        fechaDesde,
        fechaHasta,
        ordenPor,
        direccion,
        pagina,
        limite
    } = criteriosConsulta;

    const where = {};

    if (lugar) {
        where.lugar = {
            contains: lugar,
            mode: "insensitive"
        };
    }

    if (categoriaId) {
        where.categoriaId = categoriaId;
    }

    if (fechaDesde || fechaHasta) {
        where.fecha = {};

        if (fechaDesde) {
            where.fecha.gte = fechaDesde;
        }

        if (fechaHasta) {
            where.fecha.lte = fechaHasta;
        }
    }

    const desplazamiento = (pagina - 1) * limite;

    const [eventos, total] = await prisma.$transaction([
        prisma.evento.findMany({
            where: where,
            orderBy: [
                { [ordenPor]: direccion },
                { id: "asc" }
            ],
            skip: desplazamiento,
            take: limite,
            include: {
                categoria: true
            }
        }),

        prisma.evento.count({
            where: where
        })
    ]);

    return {
        eventos: eventos,
        paginacion: {
            pagina: pagina,
            limite: limite,
            total: total,
            totalPaginas: Math.ceil(total / limite)
        }
    };
};