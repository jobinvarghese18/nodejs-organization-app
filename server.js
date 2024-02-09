const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongo = require("./config/mongo");
const routes = require("./routes");
const passport = require("./middleware/passport.local");
const session = require("express-session");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/api", routes);

(async () => {
  await mongo.connect();
})();

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
