const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload");
const { setHeadersWithoutAuth } = require("../../middlewares/responseHeaders");

const { uploadData, getDataExcel } = require("../../services/uploadData");

router.get("/", setHeadersWithoutAuth, getDataExcel);

router.post("/", setHeadersWithoutAuth, upload.single("inputData"), uploadData);

module.exports = router;
