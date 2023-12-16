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
      console.log(bloodBags[0].Donor);
      // const { bloodType } = bloodBags[0].Donor;
      // console.log(bloodType);
      let bloodBagsGrouped = bloodBags.reduce((acc, bloodBag) => {
        console.log(bloodBag);
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
};
