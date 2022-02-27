const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const { deleteTimeInSeconds } = require("../../config/index");

function isOlder(path, ageSeconds) {
  now = new Date().getTime();
  const stats = fs.statSync(path);
  const mtime = stats.mtime.getTime();
  const expirationTime = mtime + ageSeconds * 1000;

  console.log("mtime is ", mtime);
  console.log("expirationTime is ", expirationTime);
  console.log("result is ", now > expirationTime);

  return now > expirationTime;
}

const deleteFiles = (folderPath, fileOrDir) => {
  let skip = false;
  let doDelete = false;
  const currentFolder = path.join(folderPath, fileOrDir);
  try {
    doDelete = isOlder(currentFolder, deleteTimeInSeconds);
  } catch (exc) {
    // ignore
    skip = true;
  }
  if (doDelete && !skip) {
    rimraf.sync(currentFolder);
  }
};

const deleteTemplates = async (req, res) => {
  try {
    const templatesFolder = `./public/templates/`;
    const filesInDir = fs.readdirSync(templatesFolder);

    console.log("templates filesInDir are .....", filesInDir);

    filesInDir.forEach(function (folder) {
      deleteFiles(templatesFolder, folder);
    });
  } catch (error) {
    console.log("Error while deleting the templates : ", error);
    return res.end(`{"success": false, errorMessage: ${error}}`);
  }
};

const deleteInputDataExcel = async (req, res) => {
  try {
    const inputDataFolder = `./public/inputData/`;
    const filesInDir = fs.readdirSync(inputDataFolder);

    console.log("excel filesInDir are .....", filesInDir);

    filesInDir.forEach(function (folder) {
      deleteFiles(inputDataFolder, folder);
    });
  } catch (error) {
    console.log("Error while deleting the Excel files : ", error);
    return res.end(`{"success": false, errorMessage: ${error}}`);
  }
};

const deleteGeneratedFiles = async (req, res) => {
  try {
    const genreatedFilesFolder = `./public/generateFiles/`;
    const filesInDir = fs.readdirSync(genreatedFilesFolder);

    console.log("generated filesInDir are .....", filesInDir);

    filesInDir.forEach(function (folder) {
      console.log(
        "folder is " +
          folder +
          " and it containse geenrated " +
          folder.indexOf("generated_")
      );
      if (folder.indexOf("generated_") > -1) {
        deleteFiles(genreatedFilesFolder, folder);
      }
    });
  } catch (error) {
    console.log("Error while deleting the Generated files : ", error);
    return res.end(`{"success": false, errorMessage: ${error}}`);
  }
};

module.exports = {
  deleteTemplates,
  deleteInputDataExcel,
  deleteGeneratedFiles,
};
