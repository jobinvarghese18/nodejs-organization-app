const express = require("express");
const router = express.Router();
const { signUp, singIn, findUser } = require("../controllers/user");
const passport = require("../middleware/passport.local");
const { authenticateJwt } = require("../middleware/passport-jwt");
const { roleGuard } = require("../middleware/role-guard");

router.get("/", findUser);
router.post("/sign-up", signUp);
router.post("/sign-in", passport.authenticate("local"), singIn);
router.get("/sign", authenticateJwt, roleGuard("admin"), (req, res) => {
  res.send({ message: "Authorized" });
});

module.exports = router;
