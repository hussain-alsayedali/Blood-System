const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getIndex: (req, res) => {
    res.json("moew");
  },
  getBloodGrouped: async (req, res) => {
    try {
      const bloodBags = await prisma.bloodBag.findMany({
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
};
