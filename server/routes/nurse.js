const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const nurseController = require("../controllers/nurse");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.post("/signup", isAuthed, authController.postSignupNurse);
router.post("/login", isAuthed, authController.postLogin);
router.get("/getAllRecipients", isAuthed, nurseController.getAllRecipient);
router.get("/getAllDonors", isAuthed, nurseController.getAllDonors);
router.get("/getDonor", isAuthed, nurseController.getDonor);
router.get("/getRecipient", isAuthed, nurseController.getRecipient);

module.exports = router;
