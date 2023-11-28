/*
  Warnings:

  - You are about to drop the column `currentUrgency` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `nurse` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Donor_username_key";

-- DropIndex
DROP INDEX "Recipient_username_key";

-- DropIndex
DROP INDEX "nurse_username_key";

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "currentUrgency",
DROP COLUMN "username",
ADD COLUMN     "currentMoney" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "username",
ADD COLUMN     "currentMoney" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "nurse" DROP COLUMN "username";
