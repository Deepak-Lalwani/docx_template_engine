const express = require("express");

const router = express.Router();

const template = require("../template");
const inputData = require("../inputData");
const generate = require("../generate");
const download = require("../download");

router.use("/template", template);

router.use("/inputData", inputData);

router.use("/generate", generate);

router.use("/download", download);

router.use("/", (req, res) => {
  console.log("root url hit");
  res.json({ message: "Hello from Express!" });
});

module.exports = router;
