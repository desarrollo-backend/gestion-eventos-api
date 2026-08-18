-- 1. Crear la tabla Categoria
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- 2. Agregar temporalmente categoriaId permitiendo NULL
ALTER TABLE "Evento"
ADD COLUMN "categoriaId" INTEGER;

-- 3. Crear una categoría para los eventos existentes
INSERT INTO "Categoria" ("nombre")
VALUES ('Jornada');

-- 4. Asignar la categoría a los eventos existentes
UPDATE "Evento"
SET "categoriaId" = (
    SELECT "id"
    FROM "Categoria"
    WHERE "nombre" = 'Jornada'
)
WHERE "categoriaId" IS NULL;

-- 5. Convertir categoriaId en obligatorio
ALTER TABLE "Evento"
ALTER COLUMN "categoriaId" SET NOT NULL;

-- 6. Crear las nuevas tablas
CREATE TABLE "ConfiguracionEvento" (
    "id" SERIAL NOT NULL,
    "modalidad" TEXT NOT NULL,
    "requiereInscripcion" BOOLEAN NOT NULL DEFAULT true,
    "eventoId" INTEGER NOT NULL,

    CONSTRAINT "ConfiguracionEvento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institucion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Institucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "participanteId" INTEGER NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- 7. Crear la tabla intermedia de Evento–Institucion
CREATE TABLE "_EventoToInstitucion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventoToInstitucion_AB_pkey" PRIMARY KEY ("A","B")
);

-- 8. Crear índices
CREATE UNIQUE INDEX "ConfiguracionEvento_eventoId_key" ON "ConfiguracionEvento"("eventoId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_eventoId_participanteId_key" ON "Inscripcion"("eventoId", "participanteId");

-- CreateIndex
CREATE INDEX "_EventoToInstitucion_B_index" ON "_EventoToInstitucion"("B");

-- 9. Crear las claves foráneas
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguracionEvento" ADD CONSTRAINT "ConfiguracionEvento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoToInstitucion" ADD CONSTRAINT "_EventoToInstitucion_A_fkey" FOREIGN KEY ("A") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoToInstitucion" ADD CONSTRAINT "_EventoToInstitucion_B_fkey" FOREIGN KEY ("B") REFERENCES "Institucion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
