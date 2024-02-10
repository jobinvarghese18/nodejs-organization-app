const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGO_URI;

const config = {
  mongodb: {
    url: uri,
    databaseName: "test",
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "commonjs",
};

module.exports = config;
