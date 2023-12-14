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
    let constraints = [];

    if (!donor || typeof donor.weight === "undefined") {
      return res.status(400).send("User information is incomplete or missing.");
    }
    // Check donor weight
    if (donor.weight < 50) {
      constraints.push("Weight is low, it should be above 50 KG");
    }
    if (donor.weight > 150) {
      constraints.push("Weight is high, it should be less than 150 KG");
    }

    // Calculate donor age
    let age = new Date().getFullYear() - new Date(donor.birth).getFullYear(); // Changed user.birth to donor.birth
    if (age < 17) {
      constraints.push("Age is low, it should be 17 years at least");
    }

    // Send response
    res.json({ ready: constraints.length === 0, constraints: constraints });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send("An error occurred while checking donation eligibility.");
  }
};

exports.createDonationRequest = async (req, res) => {
  try {
    const donorId = req.body.donorId;

    const donationRequest = await prisma.donationRequest.create({
      data: {
        donorId: donorId,
      },
    });
    res.status(201).json(donationRequest);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "An error occurred while creating the donation request.",
    });
  }
};

exports.getAllRequests = async (req, res) => {
  console.log("inside requests");
  // Check if the user is authenticated
  if (!req.user) {
    // If not, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized access." });
  }

  try {
    const donationRequests = await prisma.DonationRequest.findMany({
      where: {
        donorId: req.user.id,
      },
    });
    console.log("found the donation requests");
    res.json(donationRequests);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "An error occurred while fetching donation requests." });
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

exports.submitDonation = async (req, res) => {
  try {
    // Assuming the request body contains the blood bag's details.
    const { donorId, quantity } = req.body;

    // Check if the donor exists
    const donor = await prisma.donor.findUnique({
      where: { id: donorId },
    });

    if (!donor) {
      return res.status(404).json({ error: "Donor not found." });
    }

    // Create a new blood bag record
    const bloodBag = await prisma.bloodBag.create({
      data: {
        Donor: { connect: { id: donorId } },
        quantity,
        status: "good",
      },
    });

    return res.status(201).json(bloodBag);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while submitting the donation." });
  }
};

exports.addInfectionRequest = async (req, res) => {
  try {
    const recivedDiseaseId = req.body.diseaseId;

    prisma.infectionRequest.create({
      data: {
        diseaseId: recivedDiseaseId,
        donorId: req.user.id,
      },
    });
    res.json("succes");
  } catch (e) {
    console.log(e);
    res.json("wrong " + e);
  }
};
