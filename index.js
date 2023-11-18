const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const nurse = await prisma.nurse.create({
    data: {
      firstName: "feras",
      lastName: "aboAlli",
      bankId: "888",
      email: "meowmoew@gmail.com",
      phone: "0551238567",
      birth: new Date(1989, 1, 1),
      address: "qatif",
      weight: "999",
      username: "feras",
      password: "123456789",
    },
  });
  console.log(nurse);
}
main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
