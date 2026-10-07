import prisma from "../config/prisma.js";

export const tokenEstaRevocado = async (jti) => {
  const registro = await prisma.tokenRevocado.findUnique({
    where: { jti: jti }
  });
  return registro !== null;
};

export const revocarToken = async ({ jti, exp }) => {
  const venceEn = new Date(exp * 1000);
  await prisma.tokenRevocado.upsert({
    where: { jti: jti },
    create: { jti: jti, venceEn: venceEn },
    update: { venceEn: venceEn }
  });
};

export const eliminarRevocacionesVencidas = async () => {
  return prisma.tokenRevocado.deleteMany({
    where: {
      venceEn: { lte: new Date() }
    }
  });
};

