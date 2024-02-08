const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/user");
const passport = require("../middleware/passport.local");
router.post("/sign-up", signUp);
router.post("/secured", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Authenticated!" });
});
module.exports = router;
