const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const recipientController = require("../controllers/recipient");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.post("/signup", isAuthed, authController.postSignupRecipient);
router.post("/login", isAuthed, authController.postLoginRecipient);

router.get(
  "/currentRecipient",
  isAuthed,
  recipientController.getCurrentRecipient
);
router.get("/getAllRequests", isAuthed, recipientController.getAllRequests);
router.get("/getAllInfections", isAuthed, recipientController.getAllInfections);
router.get("/getCuredInfections", recipientController.getCuredInfections);
router.get(
  "/getUncuredInfections",
  isAuthed,
  recipientController.getUnCuredInfections
);
router.post("/addInfection", isAuthed, recipientController.addInfection);
router.post(
  "/addInfectionRequest",
  isAuthed,
  recipientController.addInfectionRequest
);
router.get("/getDiseases", isAuthed, recipientController.getAllDiseases);

// add money to account
router.post("/addMoney", isAuthed, recipientController.addMoney);

router.post(
  "/createRequest",
  isAuthed,
  recipientController.createRecivingRequest
);
module.exports = router;
