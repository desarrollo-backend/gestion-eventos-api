/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
BEGIN;

-- Quita el autoincremento del ID actual.
ALTER TABLE "Usuario"
ALTER COLUMN "id" DROP DEFAULT;

-- Cambia el tipo y asigna un UUID a cada usuario existente.
ALTER TABLE "Usuario"
ALTER COLUMN "id" TYPE UUID
USING gen_random_uuid();

-- Elimina la secuencia que utilizaba el autoincremento.
DROP SEQUENCE IF EXISTS "Usuario_id_seq";

COMMIT;