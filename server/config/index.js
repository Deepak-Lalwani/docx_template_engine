const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  deleteTimeInSeconds: process.env.DELETE_TIME_IN_SECONDS,
};
