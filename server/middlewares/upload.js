const fs = require("fs");
const path = require("path");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file is", file);
    const path = `./public/${file.fieldname}/`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    //const ext = file.mimetype.split("/")[1];
    const ext = path.extname(file.originalname);
    cb(null, `${file.originalname}_${Date.now()}${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  console.log("mimetype is ", file.mimetype);
  if (file.fieldname.toString().includes("template")) {
    if (
      file.mimetype.split("/")[1] ===
      "vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      console.log("inside word file");
      cb(null, true);
    } else {
      cb(new Error("Not a DOCX File!!"), false);
    }
  } else if (file.fieldname.toString().includes("inputData")) {
    if (
      file.mimetype.split("/")[1] ===
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Not a XLSX File!!"), false);
    }
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
