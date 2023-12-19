const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const nurseController = require("../controllers/nurse");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.get("/getBloodGrouped", isAuthed, homeController.getBloodGrouped);
router.get("/getBloodBags", isAuthed, homeController.getBloodBags);
router.get("/getAllPatients", isAuthed, nurseController.getAll);
router.get("/getAllPatientsDivided", isAuthed, nurseController.getAllDivided);
router.get("/getAllRequestes", isAuthed, nurseController.getAllRequestes);
router.get(
  "/getCurrentBloodDrive",
  isAuthed,
  homeController.getCurrentBloodDrive
);
router.get("/getAllBloodDrives", isAuthed, homeController.getAllBloodDrives);
router.get(
  "/getAllDonationInWeek",
  isAuthed,
  homeController.getAllDonationInWeek
);
router.get(
  "/getAllDonationInMonth",
  isAuthed,
  homeController.getAllDonationInMonth
);
router.get(
  "/getAllConfiremedPayments",
  isAuthed,
  homeController.getAllConfiremedPayments
);
module.exports = router;
