const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.test = (req, res) => {
  console.log(req);
};
exports.getCurrentRecipient = (req, res) => {
  try {
    res.json(req.user);
  } catch (e) {
    console.log(e);
  }
};
exports.getAllRequests = (req, res) => {
  try {
    res.json(req.user.ReceivingRequest);
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
    // Ensure user is authenticated and IDs are integers
    if (!req.user || typeof req.user.id !== "number") {
      return res
        .status(401)
        .json({ error: "User not authenticated or invalid user ID." });
    }

    console.log(req.body);
    const diseaseRecievedId = parseInt(req.body.diseaseId);
    const diseaseStrength = req.body.strength;
    const donorId = req.body.donorId;
    console.log(diseaseRecievedId + diseaseStrength);
    if (isNaN(diseaseId)) {
      return res.status(400).json({ error: "Invalid disease ID." });
    }

    await prisma.infection.create({
      data: {
        strength: diseaseStrength,
        donorId: req.body.donorid,
        diseaseId: diseaseRecievedId,
      },
    });

    res.json("success");
  } catch (e) {
    console.error(e);
  }
};
exports.getAllDiseases = async (req, res) => {
  try {
    console.log("Found all diseases");
    const allDiseases = await prisma.diseaseCatalog.findMany({});
    res.json(allDiseases);
  } catch (e) {
    console.log(e);
  }
};
exports.createRecivingRequest = async (req, res) => {
  try {
    await prisma.receivingRequest.create({
      data: {
        recipientId: req.user.id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
