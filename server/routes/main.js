const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.get("/", isAuthed, homeController.getIndex);

module.exports = router;
