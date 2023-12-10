/*
  Warnings:

  - You are about to drop the column `diseaseCatalogDiseaseId` on the `infection` table. All the data in the column will be lost.
  - Added the required column `diseaseId` to the `infection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "infection" DROP CONSTRAINT "infection_diseaseCatalogDiseaseId_fkey";

-- AlterTable
ALTER TABLE "infection" DROP COLUMN "diseaseCatalogDiseaseId",
ADD COLUMN     "diseaseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "DiseaseCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
