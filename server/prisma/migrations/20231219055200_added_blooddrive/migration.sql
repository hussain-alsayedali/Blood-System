-- AlterTable
ALTER TABLE "BloodBag" ADD COLUMN     "bloodDriveId" INTEGER;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_bloodDriveId_fkey" FOREIGN KEY ("bloodDriveId") REFERENCES "BloodDrive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
