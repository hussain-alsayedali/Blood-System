const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const nurseController = require("../controllers/nurse");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

// posts
router.post("/signup", isAuthed, authController.postSignupNurse);
router.post("/login", isAuthed, authController.postLoginNurse);
router.post("/logout", isAuthed, authController.logout);
router.post("/addInfection", isAuthed, nurseController.addInfection);

// get all
router.get("/getAllRecipients", isAuthed, nurseController.getAllRecipient);
router.get("/getAllDonors", isAuthed, nurseController.getAllDonors);
router.get("/getAll", isAuthed, nurseController.getAll);
router.get("/getSession", isAuthed, nurseController.getSession);

// patieint requests
router.get("/getAllRequestes", isAuthed, nurseController.getAllRequestes);
router.get(
  "/getWaitingRequestes",
  isAuthed,
  nurseController.getWaitingRequests
);
router.post(
  "/acceptRecipientRequest",
  isAuthed,
  nurseController.acceptRecipientRequest
);

// get one using id
router.get("/getDonor", isAuthed, nurseController.getDonor);
router.get("/getRecipient", isAuthed, nurseController.getRecipient);

// get current nurse info
router.get("/getCurrentNurse", isAuthed, nurseController.getCurrentNurse);

// delete user
router.delete("/deleteUser", isAuthed, nurseController.deleteUser);

module.exports = router;
