const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const donorController = require("../controllers/donor");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.post("/signup", isAuthed, authController.postSignupDonator);
router.post("/login", isAuthed, authController.postLoginDonor);

router.get("/currentDonor", isAuthed, donorController.getCurrentDonor);
router.get("/readyToDonate", isAuthed, donorController.isReadyToDonate);
router.get("/getAllRequests", isAuthed, donorController.getAllRequests);
router.post(
  "/createDonationRequest",
  isAuthed,
  donorController.createDonationRequest
);

// infections
router.get("/getAllInfections", isAuthed, donorController.getAllInfections);

router.get("/getCuredInfections", isAuthed, donorController.getCuredInfections);
router.get(
  "/getUncuredInfections",
  isAuthed,
  donorController.getUnCuredInfections
);
router.post("/addInfection", isAuthed, donorController.addInfection);
router.post(
  "/addInfectionRequest",
  isAuthed,
  donorController.addInfectionRequest
);

// get all the money in the current donor account,

router.post("/getAllMoney", isAuthed, donorController.getAllMoney);

router.get("/getDiseases", isAuthed, donorController.getAllDiseases);

router.post("/submitDonation", isAuthed, donorController.submitDonation);

module.exports = router;
