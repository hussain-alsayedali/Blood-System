-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'recipient';

-- AlterTable
ALTER TABLE "Recipient" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'recipient';

-- AlterTable
ALTER TABLE "nurse" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'nurse';
