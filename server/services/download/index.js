const fs = require("fs");
const path = require("path");

const downloadFiles = async (req, res) => {
  try {
    console.log("req body is ", req.body);
    const fullPath = req.body.filePath.fullPath;
    const originalName = req.body.filePath.originalName;

    console.log(path.resolve(fullPath));
    if (fullPath && fs.existsSync(path.resolve(fullPath))) {
      const bufferData = fs.readFileSync(fullPath);

      if (!bufferData)
        throw new Error(
          "Error while downloading the file, please start the process again"
        );

      res.set("Content-Type", "application/octet-stream");
      res.set("Content-Disposition", `attachment; filename=${originalName}`);
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

module.exports = { downloadFiles };
