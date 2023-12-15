-- CreateTable
CREATE TABLE "BloodDrive" (
    "id" SERIAL NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endingDate" TIMESTAMP(3) NOT NULL,
    "nurseId" INTEGER NOT NULL,

    CONSTRAINT "BloodDrive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BloodDrive" ADD CONSTRAINT "BloodDrive_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
