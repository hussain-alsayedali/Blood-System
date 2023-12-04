/*
  Warnings:

  - You are about to drop the column `donationId` on the `BloodBag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `BloodBag` will be added. If there are existing duplicate values, this will fail.
  - Made the column `donorId` on table `BloodBag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_donorId_fkey";

-- DropIndex
DROP INDEX "BloodBag_donationId_key";

-- AlterTable
ALTER TABLE "BloodBag" DROP COLUMN "donationId",
ALTER COLUMN "donorId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BloodBag_id_key" ON "BloodBag"("id");

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
