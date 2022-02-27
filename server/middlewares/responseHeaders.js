const config = require("../config");

const setResponseHeaders = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", config.endpoint);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie, *");
};

const setHeadersWithAuth = async (req, res, next) => {
  await setResponseHeaders(req, res);
  if (!req.isAuthenticated() || !req.user || !req.user.id) {
    return res.end("{}");
  } else next();
};

const setHeadersWithoutAuth = async (req, res, next) => {
  await setResponseHeaders(req, res);
  next();
};

module.exports = { setHeadersWithAuth, setHeadersWithoutAuth };
