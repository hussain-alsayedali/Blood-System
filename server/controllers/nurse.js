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
    const allDonors = await prisma.donor.findMany({});
    const allRecipients = await prisma.recipient.findMany({});
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
