const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const getFiles = require("../../utils/fileHandler");

const uploadTemplate = async (req, res) => {
  try {
    console.log("req file is ", req.files);
    if (req.files && req.files.length > 0 && req.files[0]) {
      return res.json({
        success: true,
        data: {
          templatePath: req.files[0].path,
          originalname: req.files[0].originalname,
        },
      });
    } else {
      throw Error("Error while saving template");
    }
  } catch (error) {
    console.log("Error while saving template : ", error);
    return res.json({ success: false, errorMessage: error });
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = [];
    const appDir = dirname(require.main.filename);
    console.log("appdir is ", appDir);
    const templatesFolder = `${appDir}/public/permanentFiles/templates`;
    //const filesInDir = fs.readdirSync(templatesFolder);

    let filesInDir = getFiles(templatesFolder, []);
    console.log("templates filesInDir are .....", filesInDir);

    filesInDir = filesInDir.filter((file) => {
      return (
        file.originalName.indexOf("docx") > -1 ||
        file.originalName.indexOf("xls") > -1
      );
    });

    return res.json({
      success: true,
      data: filesInDir,
    });
  } catch (error) {
    console.log("Error while downloading template : ", error);
    return res.json({ success: false, errorMessage: error });
  }
};

module.exports = { uploadTemplate, getTemplates };
