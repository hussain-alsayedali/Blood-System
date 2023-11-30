const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.get("/", isAuthed, homeController.getIndex);

router.post("/tester", isAuthed, authController.postSignupNurse);

router.get("/meow", isAuthed, homeController.meow);

module.exports = router;
