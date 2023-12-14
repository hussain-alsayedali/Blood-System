const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.test = (req, res) => {
  console.log(req);
};
exports.getSession = (req, res) => {
  res.json(req.session);
};

exports.getAllRecipient = async (req, res) => {
  try {
    const allRecipients = await prisma.recipient.findMany({});

    res.json(allRecipients);
  } catch (e) {
    console.log(e);
  }
};
exports.getAllDonors = async (req, res) => {
  try {
    const allDonors = await prisma.donor.findMany({});
    res.json(allDonors);
  } catch (e) {
    console.log(e);
  }
};
exports.getAll = async (req, res) => {
  try {
    const allDonors = await prisma.donor.findMany({
      include: {
        infections: {
          include: {
            disease: {
              select: {
                diseaseName: true,
              },
            },
          },
        },
      },
    });
    const allRecipients = await prisma.recipient.findMany({
      include: {
        infections: {
          include: {
            disease: {
              select: {
                diseaseName: true,
              },
            },
          },
        },
      },
    });
    const allUsers = [...allDonors, ...allRecipients];
    res.json(allUsers);
  } catch (e) {
    console.log(e);
  }
};
exports.getDonor = async (req, res) => {
  try {
    console.log(req.body);
    const donor = await prisma.donor.findUnique({
      where: {
        donorId: parseInt(req.body.donorId),
      },
    });
    res.json(donor);
  } catch (e) {
    console.log(e);
  }
};

exports.getRecipient = async (req, res) => {
  try {
    const recipient = await prisma.recipient.findUnique({
      where: {
        recipientId: req.body.recipientId,
      },
    });
    res.json(recipient);
  } catch (e) {
    console.log(e);
  }
};

exports.getCurrentNurse = async (req, res) => {
  try {
    console.log(req.user);
    res.json(req.user);
  } catch (e) {
    console.log(e);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    console.log("clicked");
    console.log(req.query);
    const userType = req.query.type;
    const userId = parseInt(req.query.id);
    if (userType === "donor") {
      await prisma.donor.delete({
        where: {
          id: userId,
        },
      });
    } else if (userType === "recipient") {
      await prisma.recipient.delete({
        where: {
          id: userId,
        },
      });
    } else {
      res.json("err");
    }
    res.json("succes");
  } catch (e) {
    console.log(e);
  }
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
    const donorId = parseInt(req.body.donorId);
    console.log(diseaseRecievedId + diseaseStrength);
    if (isNaN(diseaseRecievedId)) {
      return res.status(400).json({ error: "Invalid disease ID." });
    }

    await prisma.infection.create({
      data: {
        strength: diseaseStrength,
        donorId: donorId,
        diseaseId: diseaseRecievedId,
      },
    });

    res.json("success");
  } catch (e) {
    console.error(e);
  }
};

exports.getAllRequestes = async (req, res) => {
  try {
    const donationRequestes = await prisma.donationRequest.findMany({});
    const recivingRequestes = await prisma.receivingRequest.findMany({});
    const infectionRequests = await prisma.infectionRequest.findMany({});

    res.json({
      recivingRequestes: recivingRequestes,
      donationRequestes: donationRequestes,
      infectionRequests: infectionRequests,
    });
  } catch (e) {
    console.log(e);
  }
};
exports.getWaitingRequests = async (req, res) => {
  try {
    const donationRequestes = await prisma.donationRequest.findMany({
      where: {
        requestStatus: "waiting",
      },
    });
    const recivingRequestes = await prisma.receivingRequest.findMany({
      where: {
        requestStatus: "waiting",
      },
    });
    const infectionRequests = await prisma.infectionRequest.findMany({
      where: {
        requestStatus: "waiting",
      },
    });
    res.json({
      recivingRequestes: recivingRequestes,
      donationRequestes: donationRequestes,
      infectionRequests: infectionRequests,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.acceptRecipientRequest = async (req, res) => {
  try {
    const reqestId = parseInt(req.body.reqestId);
    const recipintId = parseInt(req.body.recipintId);
    const bloodType = req.body.bloodType;
    console.log(reqestId, recipintId, bloodType);

    console.log(recipintBloodType);
    const notTakenBloodBag = await prisma.bloodBag.findFirst({
      where: {
        status: "good",
        Donor: {
          bloodType: bloodType,
        },
      },
    });
    if (notTakenBloodBag) {
      const updatedBloodBag = await prisma.bloodBag.update({
        where: {
          id: notTakenBloodBag.id,
        },
        data: {
          status: "taken",
          givenTo: recipintId,
        },
      });
    }

    const updateRecivingRequest = await prisma.receivingRequest.update({
      where: {
        id: reqestId,
      },
      data: {
        updateDate: new Date(),
        operationStatus: "success",
        requestStatus: "accepted",
        nurseId: req.user.id,
        bloodBagId: notTakenBloodBag.id,
      },
    });

    const theRecipient = await prisma.recipient.findUnique({
      where: {
        id: recipintId,
      },
    });

    prisma.recipient.update({
      where: {
        id: recipintId,
      },
      data: {
        currentMoney: parseInt(theRecipient.currentMoney) + 50,
      },
    });

    res.json("succes");
  } catch (e) {
    console.log(e);
  }
};

exports.declineRecipientRequest = async (req, res) => {
  try {
    const reqestId = parseInt(req.body.reqestId);
    const recipintId = parseInt(req.body.recipintId);
    console.log(reqestId, recipintId);
    const updateRecivingRequest = await prisma.receivingRequest.update({
      where: {
        id: reqestId,
      },
      data: {
        updateDate: new Date(),
        requestStatus: "rejected",
        nurseId: req.user.id,
      },
    });
    res.json("succses");
  } catch (e) {
    console.log(e);
  }
};

exports.acceptDonationRequest = async (req, res) => {
  try {
    const reqestId = parseInt(req.body.reqestId);
    const recivedDonorId = parseInt(req.body.donorId);

    const newBloodBag = await prisma.bloodBag.create({
      data: {
        donorId: recivedDonorId,
      },
    });
    const updatedRequest = await prisma.donationRequest.update({
      where: {
        id: reqestId,
      },
      data: {
        updateDate: new Date(),
        operationStatus: "success",
        requestStatus: "accepted",
        nurseId: req.user.id,
        bloodBagId: newBloodBag.id,
      },
    });

    const theDonor = await prisma.donor.findUnique({
      where: {
        id: recivedDonorId,
      },
    });

    await prisma.donor.update({
      where: {
        id: recivedDonorId,
      },
      data: {
        currentMoney: parseInt(theDonor.currentMoney) + 50,
      },
    });
    res.json("succses");
  } catch (e) {
    console.log(e);
  }
};

exports.declineDonationRequest = async (req, res) => {
  try {
    const reqestId = parseInt(req.body.reqestId);
    const recivedDonorId = parseInt(req.body.donorId);

    const updateRecivingRequest = await prisma.donationRequest.update({
      where: {
        id: reqestId,
      },
      data: {
        updateDate: new Date(),
        requestStatus: "rejected",
        nurseId: req.user.id,
      },
    });
    res.json("Rejected");
  } catch (e) {
    console.log(e);
  }
};

exports.editPatientInfo = async (req, res) => {
  try {
    console.log(req.body);
    const patientType = req.body.patientType;
    const patientId = parseInt(req.body.id);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const changedBirth = new Date(req.body.birth);
    const changedEmail = req.body.email;
    const changedWeight = req.body.weight;
    const changedPhone = req.body.phone;
    const changedBloodType = req.body.bloodType;

    if (patientType === "recipient") {
      await prisma.recipient.update({
        where: {
          id: patientId,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          birth: changedBirth,
          email: changedEmail,
          weight: changedWeight,
          phone: changedPhone,
          bloodType: changedBloodType,
        },
      });
    } else {
      await prisma.donor.update({
        where: {
          id: patientId,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          birth: changedBirth,
          email: changedEmail,
          weight: changedWeight,
          phone: changedPhone,
          bloodType: changedBloodType,
        },
      });
    }
    res.json("succes");
  } catch (e) {
    console.log(e);
    res.json("fail");
  }
};

exports.declineInfectionRequest = async (req, res) => {
  try {
    const requestId = req.body.requestId;

    const theRequest = await prisma.infectionRequest.update({
      where: {
        id: requestId,
      },
      data: {
        updateDate: new Date(),
        requestStatus: "rejected",
        nurseId: req.user.id,
      },
    });
    req.json("succes");
  } catch (e) {
    console.log(e);
    res.json("wrong " + e);
  }
};

exports.acceptInfectionRequest = async (req, res) => {
  try {
    const requestId = parseInt(req.body.requestId);
    const requesterType = req.body.requesterType;
    const requesterId = req.body.requesterId;

    const theRequest = await prisma.infectionRequest.update({
      where: {
        id: requestId,
      },
      data: {
        updateDate: new Date(),
        requestStatus: "accepted",
        nurseId: req.user.id,
      },
    });

    // Creating the infection
    if (requesterType == "donor") {
      await prisma.infection.create({
        data: {
          strength: "mid",
          donorId: requesterId,
          diseaseId: theRequest.diseaseCatalogId,
        },
      });
    } else if (requesterType == "recipient") {
      await prisma.infection.create({
        data: {
          strength: "mid",
          recipientId: requesterId,
          diseaseId: theRequest.diseaseCatalogId,
        },
      });
    }
    res.json("succes");
  } catch (e) {
    console.log(e);
    res.json("wrong" + e);
  }
};
