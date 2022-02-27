const express = require("express");

const router = express.Router();

const { generateFiles } = require("../../services/generate");
const { setHeadersWithoutAuth } = require("../../middlewares/responseHeaders");

router.post("/", setHeadersWithoutAuth, generateFiles);

module.exports = router;
