/*
  Warnings:

  - The primary key for the `BloodBag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bagId` on the `BloodBag` table. All the data in the column will be lost.
  - The primary key for the `BloodBank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bloodBankId` on the `BloodBank` table. All the data in the column will be lost.
  - The primary key for the `DiseaseCatalog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `diseaseId` on the `DiseaseCatalog` table. All the data in the column will be lost.
  - The primary key for the `Donor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `donorId` on the `Donor` table. All the data in the column will be lost.
  - The primary key for the `Recipient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipientId` on the `Recipient` table. All the data in the column will be lost.
  - The primary key for the `infection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `infectionId` on the `infection` table. All the data in the column will be lost.
  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nurseId` on the `nurse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_bloodBankId_fkey";

-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_donorId_fkey";

-- DropForeignKey
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "DonationRequest" DROP CONSTRAINT "DonationRequest_bloodBagId_fkey";

-- DropForeignKey
ALTER TABLE "DonationRequest" DROP CONSTRAINT "DonationRequest_donorId_fkey";

-- DropForeignKey
ALTER TABLE "DonationRequest" DROP CONSTRAINT "DonationRequest_nurseId_fkey";

-- DropForeignKey
ALTER TABLE "ReceivingRequest" DROP CONSTRAINT "ReceivingRequest_bloodBagId_fkey";

-- DropForeignKey
ALTER TABLE "ReceivingRequest" DROP CONSTRAINT "ReceivingRequest_nurseId_fkey";

-- DropForeignKey
ALTER TABLE "ReceivingRequest" DROP CONSTRAINT "ReceivingRequest_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "infection" DROP CONSTRAINT "infection_diseaseCatalogDiseaseId_fkey";

-- DropForeignKey
ALTER TABLE "infection" DROP CONSTRAINT "infection_donorDonorId_fkey";

-- DropForeignKey
ALTER TABLE "infection" DROP CONSTRAINT "infection_recipientRecipientId_fkey";

-- AlterTable
ALTER TABLE "BloodBag" DROP CONSTRAINT "BloodBag_pkey",
DROP COLUMN "bagId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BloodBag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BloodBank" DROP CONSTRAINT "BloodBank_pkey",
DROP COLUMN "bloodBankId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BloodBank_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DiseaseCatalog" DROP CONSTRAINT "DiseaseCatalog_pkey",
DROP COLUMN "diseaseId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DiseaseCatalog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_pkey",
DROP COLUMN "donorId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Donor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Recipient" DROP CONSTRAINT "Recipient_pkey",
DROP COLUMN "recipientId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "infection" DROP CONSTRAINT "infection_pkey",
DROP COLUMN "infectionId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "infection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "nurse" DROP CONSTRAINT "nurse_pkey",
DROP COLUMN "nurseId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "nurse_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_diseaseCatalogDiseaseId_fkey" FOREIGN KEY ("diseaseCatalogDiseaseId") REFERENCES "DiseaseCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_recipientRecipientId_fkey" FOREIGN KEY ("recipientRecipientId") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_donorDonorId_fkey" FOREIGN KEY ("donorDonorId") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "BloodBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_bloodBagId_fkey" FOREIGN KEY ("bloodBagId") REFERENCES "BloodBag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingRequest" ADD CONSTRAINT "ReceivingRequest_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingRequest" ADD CONSTRAINT "ReceivingRequest_bloodBagId_fkey" FOREIGN KEY ("bloodBagId") REFERENCES "BloodBag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingRequest" ADD CONSTRAINT "ReceivingRequest_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
