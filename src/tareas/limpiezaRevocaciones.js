import { eliminarRevocacionesVencidas }
  from "../services/revocaciones.service.js";

const INTERVALO_MS = 60 * 60 * 1000;

export const iniciarLimpiezaRevocaciones = () => {
  const ejecutar = async () => {
    try {
      const { count } = await eliminarRevocacionesVencidas();
      console.log("Revocaciones vencidas eliminadas:", count);
    } catch (error) {
      console.error("Falló la limpieza:", error.message);
    } finally {
      setTimeout(ejecutar, INTERVALO_MS).unref();
    }
  };
  void ejecutar();
};
