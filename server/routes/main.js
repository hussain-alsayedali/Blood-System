const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const nurseController = require("../controllers/nurse");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.get("/", isAuthed, homeController.getIndex);

router.post("/signupnurse", isAuthed, authController.postSignupNurse);

// guest page :
router.get("/getBloodGrouped", isAuthed, homeController.getBloodGrouped);
router.get("/getAllPatients", isAuthed, nurseController.getAll);
router.get("/getAllRequestes", isAuthed, nurseController.getAllRequestes);
router.get(
  "/getCurrentBloodDrive",
  isAuthed,
  homeController.getCurrentBloodDrive
);

module.exports = router;
