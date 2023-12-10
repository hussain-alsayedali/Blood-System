/*
  Warnings:

  - You are about to drop the column `donorDonorId` on the `infection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "infection" DROP CONSTRAINT "infection_donorDonorId_fkey";

-- AlterTable
ALTER TABLE "BloodBag" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'good';

-- AlterTable
ALTER TABLE "infection" DROP COLUMN "donorDonorId",
ADD COLUMN     "donorId" INTEGER,
ALTER COLUMN "dateOfInfection" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "cured" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
