const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload");
const { setHeadersWithoutAuth } = require("../../middlewares/responseHeaders");

const { getTemplates, uploadTemplate } = require("../../services/template");

//router.use('/', setHeaders);

router.get("/", setHeadersWithoutAuth, getTemplates);

router.post("/", setHeadersWithoutAuth, upload.any(), uploadTemplate);

module.exports = router;
