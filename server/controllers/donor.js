const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.test = (req, res) => {
  console.log(req);
};

exports.getCurrentDonor = (req, res) => {
  res.json(req.user);
};
