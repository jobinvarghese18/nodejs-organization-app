const ExtractJwt = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const User = require("../models/user");
dotenv.config();

const secret = process.env.JWT_SECRET;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await User.findOne({ _id: payload.user._id });
    if (user) return done(null, user);
    else return done({ error: true, message: "User not found" }, false);
  })
);

const authenticateJwt = passport.authenticate("jwt", { session: false });

module.exports = { passport, authenticateJwt };
