const { PrismaClient } = require("@prisma/client");
const { json } = require("body-parser");
const prisma = new PrismaClient();

module.exports = {
  getIndex: (req, res) => {
    res.json("moew");
  },
  getBloodGrouped: async (req, res) => {
    try {
      const bloodBags = await prisma.bloodBag.findMany({
        where: {
          status: "good",
        },
        include: {
          Donor: {
            select: {
              bloodType: true,
            },
          },
        },
      });
      // const { bloodType } = bloodBags[0].Donor;
      // console.log(bloodType);
      let bloodBagsGrouped = bloodBags.reduce((acc, bloodBag) => {
        const { bloodType } = bloodBag.Donor;
        if (!acc[bloodType]) {
          acc[bloodType] = 0;
        }
        acc[bloodType]++;
        return acc;
      }, {});
      res.json(bloodBagsGrouped);
    } catch (e) {
      console.log(e);
    }
  },
  getBloodBags: async (req, res) => {
    try {
      const bloodBags = await prisma.bloodBag.findMany({
        where: {
          status: "good",
        },
        include: {
          Donor: {
            select: {
              bloodType: true,
            },
          },
          BloodDrive: true,
        },
      });
      res.json({ bloodBags: bloodBags });
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  },
  getCurrentBloodDrive: async (req, res) => {
    try {
      const bloodDrive = await prisma.bloodDrive.findFirst({
        where: {
          endingDate: {
            gte: new Date(),
          },
        },
      });
      let message = "there is no blood drive currently";
      if (bloodDrive)
        message =
          "there is a blood drive, go to donate to get 300 extra in your account";

      res.json({
        bloodDrive: bloodDrive,
        message: message,
      });
    } catch (e) {
      console.log("error" + e);
      res.json(e);
    }
  },
  getAllBloodDrives: async (req, res) => {
    const allBloodDrives = await prisma.bloodDrive.findMany({
      include: {
        BloodBags: true,
      },
    });
    res.json({ allBloodDrives: allBloodDrives });
  },
  getAllDonationInWeek: async (req, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Subtracts 7 days from the current date

    const bloodBagsWithinWeek = await prisma.bloodBag.findMany({
      where: {
        takingDate: {
          gte: startDate,
        },
      },
    });
    res.json({ bloodBagsWithinWeek: bloodBagsWithinWeek });
  },
  getAllDonationInMonth: async (req, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28); // Subtracts 7 days from the current date

    const bloodBagsWithinMonth = await prisma.bloodBag.findMany({
      where: {
        takingDate: {
          gte: startDate,
        },
      },
    });
    res.json({ bloodBagsWithinMonth: bloodBagsWithinMonth });
  },
  getAllConfiremedPayments: async (req, res) => {
    const allBloodBags = await prisma.bloodBag.findMany({
      include: {
        BloodDrive: true,
      },
    });
    res.json(allBloodBags);
  },
};
