const express = require("express");
const router = express.Router();
const { signUp, singIn } = require("../controllers/user");
const passport = require("../middleware/passport.local");
router.post("/sign-up", signUp);
router.post("/sign-in", passport.authenticate("local"), singIn);
module.exports = router;
