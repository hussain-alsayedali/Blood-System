const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.test = (req, res) => {
  console.log(req);
};

exports.getCurrentDonor = (req, res) => {
  try {
    res.json(req.user);
  } catch (e) {
    console.log(e);
  }
};
exports.isReadyToDonate = (req, res) => {
  try {
    const donor = req.user;
    let constrains = [];
    if (donor.weight < 50) {
      constrains.push("Weight is Low , it should be above 50 KG");
    }
    if (donor.weight > 150) {
      constrains.push("Weight is high , it should be less than 150 KG");
    }

    let age = new Date().getFullYear() - new Date(user.birth).getFullYear();
    if (age < 17) {
      constrains.push("age is low, it Should be 17 years at least");
    }

    res.json({ ready: constrains.length === 0, constrains: constrains });
  } catch (e) {
    console.log(e);
  }
};

exports.createDonationRequest = async (req, res) => {
  try {
    await prisma.donor.create({
      data: {
        donorId: req.user.id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllRequests = (req, res) => {
  try {
    res.json(req.user.DonationRequest);
  } catch (e) {
    console.log(e);
  }
};
exports.getAllInfections = async (req, res) => {
  try {
    const allinfections = req.user.infections;

    res.json(allinfections);
  } catch (e) {
    console.log(e);
    res.json("error");
  }
};
exports.getCuredInfections = async (req, res) => {
  try {
    const allinfections = req.user.infections;
    const curedInfections = allinfections.filter(
      (infection) => infection.cured === "true"
    );
    res.json(curedInfections);
  } catch (e) {}
};
exports.getUnCuredInfections = async (req, res) => {
  try {
    const allinfections = req.user.infections;
    const curedInfections = allinfections.filter(
      (infection) => infection.cured === "false"
    );
    res.json(curedInfections);
  } catch (e) {}
};
exports.addInfection = async (req, res) => {
  try {
    const diseaseId = req.body.diseaseId;
    const diseaseStrength = req.body.strength;
    await prisma.infection.create({
      data: {
        strength: diseaseStrength,
        donorId: req.user.id,
        diseaseId: diseaseId,
      },
    });
    res.json("success");
  } catch (e) {
    console.log(e);
    res.json("error");
  }
};

exports.getAllDiseases = async (req, res) => {
  try {
    const allDiseases = await prisma.diseaseCatalog.findMany({});
    res(allDiseases);
  } catch (e) {}
};
