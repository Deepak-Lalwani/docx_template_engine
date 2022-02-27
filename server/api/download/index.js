const express = require("express");

const router = express.Router();

const { downloadFiles } = require("../../services/download");
const { setHeadersWithoutAuth } = require("../../middlewares/responseHeaders");

router.post("/", setHeadersWithoutAuth, downloadFiles);

module.exports = router;
