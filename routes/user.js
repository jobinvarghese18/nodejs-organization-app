const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const {
  signUp,
  singIn,
  removeUser,
  findUser,
  signUpBodySchema,
  signInBodySChema,
} = require("../controllers/user");
const passport = require("../middleware/passport.local");
const { authenticateJwt } = require("../middleware/passport-jwt");
const { roleGuard } = require("../middleware/role-guard");

router.get("/", authenticateJwt, findUser);
router.post("/sign-up", validator.body(signUpBodySchema), signUp);
router.post(
  "/sign-in",
  validator.body(signInBodySChema),
  passport.authenticate("local"),
  singIn
);
router.delete("/", authenticateJwt, roleGuard("admin"), removeUser);
router.get("/sign", authenticateJwt, roleGuard("admin"), (req, res) => {
  res.send({ message: "Authorized" });
});

module.exports = router;
