import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

// Cantidad de trabajo que realizará bcrypt.
const FACTOR_COSTO = 10;

export const registrarUsuario = async (
    registrarUsuarioDto
) => {
    const { nombre, email, password } =
        registrarUsuarioDto;

    // Busca un usuario con el mismo email.
    const usuarioExistente =
        await prisma.usuario.findUnique({
            where: { email: email }
        });

    if (usuarioExistente) {
        const error = new Error(
            "Ya existe un usuario con ese email."
        );

        error.status = 409;
        throw error;
    }

    // Genera el salt y el hash de la contraseña.
    const passwordHash = await bcrypt.hash(
        password,
        FACTOR_COSTO
    );

    // Guarda el hash, nunca la contraseña original.
    return prisma.usuario.create({
        data: {
            nombre: nombre,
            email: email,
            passwordHash: passwordHash
        },
        select: {
            id: true,
            nombre: true,
            email: true,
            createdAt: true
        }
    });
};

export const iniciarSesion = async (
    iniciarSesionDto
) => {
    const { email, password } =
        iniciarSesionDto;

    const usuario =
        await prisma.usuario.findUnique({
            where: { email: email }
        });

    if (!usuario) {
        const error = new Error(
            "Las credenciales son inválidas."
        );

        error.status = 401;
        throw error;
    }

    // Compara la contraseña con el hash almacenado.
    const passwordValida = await bcrypt.compare(
        password,
        usuario.passwordHash
    );

    if (!passwordValida) {
        const error = new Error(
            "Las credenciales son inválidas."
        );

        error.status = 401;
        throw error;
    }

    // respuesta del servicio.
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
    };
};

export const obtenerUsuarioPorId = async (id) => {
  return prisma.usuario.findUnique({
    where: { id: id },
    select: {
      id: true,
      nombre: true,
      email: true
    }
  });
};
