-- CreateTable
CREATE TABLE "nurse" (
    "nurseId" SERIAL NOT NULL,
    "bankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "nurse_pkey" PRIMARY KEY ("nurseId")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "recipientId" SERIAL NOT NULL,
    "currentUrgency" TEXT NOT NULL,
    "bankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("recipientId")
);

-- CreateTable
CREATE TABLE "Donor" (
    "donorId" SERIAL NOT NULL,
    "currentUrgency" TEXT NOT NULL,
    "bankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("donorId")
);

-- CreateTable
CREATE TABLE "infection" (
    "infectionId" SERIAL NOT NULL,
    "dateOfInfection" TIMESTAMP(3) NOT NULL,
    "dateOfheal" TIMESTAMP(3),
    "strength" TEXT NOT NULL,
    "cured" BOOLEAN NOT NULL,
    "recipientRecipientId" INTEGER,
    "donorDonorId" INTEGER,
    "diseaseCatalogDiseaseId" INTEGER NOT NULL,

    CONSTRAINT "infection_pkey" PRIMARY KEY ("infectionId")
);

-- CreateTable
CREATE TABLE "DiseaseCatalog" (
    "diseaseId" SERIAL NOT NULL,
    "diseaseName" TEXT NOT NULL,

    CONSTRAINT "DiseaseCatalog_pkey" PRIMARY KEY ("diseaseId")
);

-- CreateTable
CREATE TABLE "Blood" (
    "type" TEXT NOT NULL,
    "recieveFrom" TEXT NOT NULL,

    CONSTRAINT "Blood_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "BloodBag" (
    "bagId" SERIAL NOT NULL,
    "recipientRecipientId" INTEGER,
    "recipientDate" TIMESTAMP(3),
    "donorDonorId" INTEGER,
    "donationId" INTEGER NOT NULL,
    "bloodBankId" INTEGER,

    CONSTRAINT "BloodBag_pkey" PRIMARY KEY ("bagId")
);

-- CreateTable
CREATE TABLE "Donation" (
    "donationId" SERIAL NOT NULL,
    "donationDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "opperationStatus" TEXT NOT NULL,
    "donorDonorId" INTEGER NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("donationId")
);

-- CreateTable
CREATE TABLE "BloodBank" (
    "bloodBankId" SERIAL NOT NULL,

    CONSTRAINT "BloodBank_pkey" PRIMARY KEY ("bloodBankId")
);

-- CreateIndex
CREATE UNIQUE INDEX "nurse_bankId_key" ON "nurse"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "nurse_email_key" ON "nurse"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nurse_phone_key" ON "nurse"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "nurse_username_key" ON "nurse"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_bankId_key" ON "Recipient"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_email_key" ON "Recipient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_phone_key" ON "Recipient"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_username_key" ON "Recipient"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_bankId_key" ON "Donor"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_phone_key" ON "Donor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_username_key" ON "Donor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Blood_type_key" ON "Blood"("type");

-- CreateIndex
CREATE UNIQUE INDEX "BloodBag_donationId_key" ON "BloodBag"("donationId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_donationId_key" ON "Donation"("donationId");

-- AddForeignKey
ALTER TABLE "Recipient" ADD CONSTRAINT "Recipient_bloodType_fkey" FOREIGN KEY ("bloodType") REFERENCES "Blood"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_bloodType_fkey" FOREIGN KEY ("bloodType") REFERENCES "Blood"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_diseaseCatalogDiseaseId_fkey" FOREIGN KEY ("diseaseCatalogDiseaseId") REFERENCES "DiseaseCatalog"("diseaseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_recipientRecipientId_fkey" FOREIGN KEY ("recipientRecipientId") REFERENCES "Recipient"("recipientId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infection" ADD CONSTRAINT "infection_donorDonorId_fkey" FOREIGN KEY ("donorDonorId") REFERENCES "Donor"("donorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_recipientRecipientId_fkey" FOREIGN KEY ("recipientRecipientId") REFERENCES "Recipient"("recipientId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("donationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_donorDonorId_fkey" FOREIGN KEY ("donorDonorId") REFERENCES "Donor"("donorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBag" ADD CONSTRAINT "BloodBag_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "BloodBank"("bloodBankId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorDonorId_fkey" FOREIGN KEY ("donorDonorId") REFERENCES "Donor"("donorId") ON DELETE RESTRICT ON UPDATE CASCADE;
