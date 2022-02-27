const xlsxReader = require("xlsx");
const getFiles = require("../../utils/fileHandler");

const uploadData = async (req, res) => {
  try {
    const file = xlsxReader.readFile(req.file.path);
    let data = [];

    const sheets = file.SheetNames;

    var sheetIndex = 0;
    if (req.body.sheetName) {
      sheetIndex = sheets.findIndex(
        (sheetName) => sheetName === req.body.sheetName
      );
      if (sheetIndex < 0) sheetIndex = 0;
    }

    const temp = xlsxReader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[sheetIndex]]
    );
    temp.forEach((res) => {
      data.push(res);
    });

    if (data.length > 30) {
      throw new Error(
        "Input data exceeds the limit!!! 30 Rows allowed at a time "
      );
      return;
    }

    //making address as an array
    data.map((element) => {
      if (element.address) {
        element.address = element.address
          .toString()
          .split(",")
          .map((element) => element.trim());
      }
    });

    console.log(data);

    return res.json({ success: true, data });
  } catch (error) {
    console.log("Error while parsing XSLX file : ", error);
    return res.json({ success: false, errorMessage: error.message });
  }
};

const getDataExcel = async (req, res) => {
  try {
    const templates = [];
    const dataExcelFolder = `./public/permanentFiles/dataExcel`;
    //const filesInDir = fs.readdirSync(templatesFolder);

    const filesInDir = getFiles(dataExcelFolder, []);
    console.log("excel filesInDir are .....", filesInDir);

    return res.json({
      success: true,
      data: filesInDir,
    });
  } catch (error) {
    console.log("Error while downloading data excel : ", error);
    return res.json({ success: false, errorMessage: error });
  }
};

module.exports = { uploadData, getDataExcel };
