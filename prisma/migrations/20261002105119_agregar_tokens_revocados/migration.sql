-- CreateTable
CREATE TABLE "TokenRevocado" (
    "jti" TEXT NOT NULL,
    "venceEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenRevocado_pkey" PRIMARY KEY ("jti")
);

-- CreateIndex
CREATE INDEX "TokenRevocado_venceEn_idx" ON "TokenRevocado"("venceEn");
