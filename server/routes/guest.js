const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const nurseController = require("../controllers/nurse");
const { ensureAuth, ensureGuest, isAuthed } = require("../middleware/auth");

router.get("/getBloodGrouped", isAuthed, homeController.getBloodGrouped);
router.get("/getAllPatients", isAuthed, nurseController.getAll);
router.get("/getAllRequestes", isAuthed, nurseController.getAllRequestes);

module.exports = router;
