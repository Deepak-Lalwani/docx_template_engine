const fs = require("fs");
const path = require("path");

const docxtemplaterHelper = require("../../utils/docxtemplater-helper");
const downloadZip = require("../../utils/zipDownloader");

const generateFiles = async (req, res) => {
  try {
    console.log("req body is ", req.body);
    const templateName = req.body.templateName;
    const templatePath = req.body.templatePath;
    const inputData = req.body.inputData;
    console.log(path.resolve(templatePath));
    if (templatePath && fs.existsSync(path.resolve(templatePath))) {
      //file exists
      if (!inputData || inputData.length <= 0) {
        throw new Error("Input data file got courrpted, please upload again");
        return;
      }

      if (inputData.length > 30) {
        throw new Error(
          "Input data exceeds the limit!!! 30 Rows allowed at a time "
        );
        return;
      }

      const genreatedFilePath = await docxtemplaterHelper(
        templateName,
        templatePath,
        inputData
      );
      const bufferData = downloadZip(genreatedFilePath);

      if (!bufferData)
        throw new Error(
          "Error while downloading the zip file, please start the process again"
        );

      res.set("Content-Type", "application/octet-stream");
      res.set(
        "Content-Disposition",
        `attachment; filename=${templateName}.zip`
      );
      res.set("Content-Length", bufferData.length);
      res.send(bufferData);
      //return res.end(`{"success": true, data: ${bufferData} }`);
    } else {
      res.status(404);
      throw new Error(
        "Template file got courrpted, please start the process again"
      );
    }
  } catch (error) {
    console.log("Error while downloading the files : ", error);
    res.status(404);
    return res.end(`{"success": false, errorMessage: ${error.message}}`);
  }
};

module.exports = { generateFiles };
