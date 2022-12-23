const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/api/home");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/submission", ensureLoggedIn, homeController.home);

module.exports = router;
