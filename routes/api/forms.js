const express = require("express");
const router = express.Router();
const formsCtrl = require("../../controllers/api/forms");

router.post("/create", formsCtrl.createForm);

module.exports = router;
