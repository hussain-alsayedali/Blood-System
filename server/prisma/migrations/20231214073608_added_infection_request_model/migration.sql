-- CreateTable
CREATE TABLE "InfectionRequest" (
    "id" SERIAL NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "infectionId" INTEGER NOT NULL,
    "recipientId" INTEGER,
    "donorId" INTEGER,
    "updateDate" TIMESTAMP(3),
    "requestStatus" TEXT DEFAULT 'waiting',
    "nurseId" INTEGER,

    CONSTRAINT "InfectionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfectionRequest_id_key" ON "InfectionRequest"("id");

-- AddForeignKey
ALTER TABLE "InfectionRequest" ADD CONSTRAINT "InfectionRequest_infectionId_fkey" FOREIGN KEY ("infectionId") REFERENCES "infection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfectionRequest" ADD CONSTRAINT "InfectionRequest_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfectionRequest" ADD CONSTRAINT "InfectionRequest_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfectionRequest" ADD CONSTRAINT "InfectionRequest_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
