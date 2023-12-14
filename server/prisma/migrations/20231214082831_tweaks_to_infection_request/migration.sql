/*
  Warnings:

  - You are about to drop the column `infectionId` on the `InfectionRequest` table. All the data in the column will be lost.
  - Added the required column `diseaseCatalogId` to the `InfectionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InfectionRequest" DROP CONSTRAINT "InfectionRequest_infectionId_fkey";

-- AlterTable
ALTER TABLE "InfectionRequest" DROP COLUMN "infectionId",
ADD COLUMN     "diseaseCatalogId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InfectionRequest" ADD CONSTRAINT "InfectionRequest_diseaseCatalogId_fkey" FOREIGN KEY ("diseaseCatalogId") REFERENCES "DiseaseCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
