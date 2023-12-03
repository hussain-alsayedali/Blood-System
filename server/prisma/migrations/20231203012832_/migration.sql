/*
  Warnings:

  - You are about to drop the column `donorDonorId` on the `BloodBag` table. All the data in the column will be lost.
  - You are about to drop the column `recipientRecipientId` on the `BloodBag` table. All the data in the column will be lost.
  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_donationId_fkey";

-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_donorDonorId_fkey";

-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_recipientRecipientId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donorDonorId_fkey";

-- AlterTable
ALTER TABLE "BloodBag" DROP COLUMN "donorDonorId",
DROP COLUMN "recipientRecipientId",
ADD COLUMN     "donorId" INTEGER,
ADD COLUMN     "recipientId" INTEGER,
ADD COLUMN     "takingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Donation";

-- CreateTable
CREATE TABLE "DonationRequest" (
    "id" SERIAL NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,
    "bloodBagId" INTEGER,
    "operationStatus" TEXT,
    "requestStatus" TEXT DEFAULT 'waiting',
    "updateDate" TIMESTAMP(3),
    "nurseId" INTEGER,

    CONSTRAINT "DonationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceivingRequest" (
    "id" SERIAL NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientId" INTEGER NOT NULL,
    "bloodBagId" INTEGER,
    "updateDate" TIMESTAMP(3),
    "operationStatus" TEXT,
    "requestStatus" TEXT DEFAULT 'waiting',
    "nurseId" INTEGER,

    CONSTRAINT "ReceivingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DonationRequest_id_key" ON "DonationRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ReceivingRequest_id_key" ON "ReceivingRequest"("id");

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("recipientId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("donorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("donorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_bloodBagId_fkey" FOREIGN KEY ("bloodBagId") REFERENCES "BloodBag"("bagId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurse"("nurseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingRequest" ADD CONSTRAINT "ReceivingRequest_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("recipientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingRequest" ADD CONSTRAINT "ReceivingRequest_bloodBagId_fkey" FOREIGN KEY ("bloodBagId") REFERENCES "BloodBag"("bagId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingRequest" ADD CONSTRAINT "ReceivingRequest_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurse"("nurseId") ON DELETE SET NULL ON UPDATE CASCADE;
