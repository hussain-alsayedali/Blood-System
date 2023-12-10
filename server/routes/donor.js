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
router.post("/createRequest", isAuthed, donorController.createDonationRequest);

module.exports = router;
