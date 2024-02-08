const express = require("express");
const router = express.Router();
const user = require("./user");
const organization = require("./organization");

router.use("/user", user);
router.use("/organization", organization);

module.exports = router;
