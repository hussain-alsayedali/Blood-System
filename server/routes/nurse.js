const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.post("/signup", isAuthed, authController.postSignupNurse);
router.post("/login", isAuthed, authController.postLogin);

module.exports = router;
