// HOTFIX-005: Control de idempotencia para evitar duplicados
export const procesarPagoSeguro = async (idTransaccion: string) => {
  const pagoExistente = await db.pagos.findUnique({ where: { idTransaccion } });

  if (pagoExistente) {
    throw new Error("Transacción duplicada detectada. Operación cancelada.");
  }

  return await db.pagos.create({ data: { idTransaccion, status: 'PROCESADO' } });
};
