const express = require("express");
const router = express.Router();
const { signUp, singIn } = require("../controllers/user");
const passport = require("../middleware/passport.local");
const { authenticateJwt } = require("../middleware/passport-jwt");

router.post("/sign-up", signUp);
router.post("/sign-in", passport.authenticate("local"), singIn);
router.get("/sign", authenticateJwt, (req, res) => {
  res.send({ message: "Authorized" });
});

module.exports = router;
