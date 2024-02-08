const express = require("express");
const dotenv = require("dotenv");
const mongo = require("./config/mongo");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

dotenv.config();

(async () => {
  await mongo.connect();
})();

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
