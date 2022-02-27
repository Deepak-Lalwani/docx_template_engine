var fs = require("fs");
var path = require("path");

var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");

const docxtemplaterHelper = async (templateName, templatePath, data_array) => {
  try {
    // console.log("data array is ...", data_array);

    const genreatedFilePath = `./public/generateFiles/${templateName}_${Date.now()}`;
    fs.mkdirSync(genreatedFilePath, { recursive: true });

    // render the document
    // (replace all occurences of {first_name} by John, {last_name} by Doe, ...)

    data_array.map(async (data) => {
      // console.log("data is...", data);

      var content = fs.readFileSync(templatePath, "binary");

      var zip = new PizZip(content);

      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render({
        ...data,
      });
      var buf = doc.getZip().generate({ type: "nodebuffer" });
      // console.log("buf is...", buf);

      var fileName = (data.prop_name || data.address[0] + ".docx")
        .toString()
        .replace(/\//g, "_");
      // fileName = fileName.toString().replace(/\//g, "_");
      // console.log("fileName is...", fileName);

      // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
      fs.writeFileSync(path.join(genreatedFilePath, `/${fileName}`), buf);
      // console.log("file written");
    });
    return genreatedFilePath;
  } catch (error) {
    console.error("Error inside docxtemplater-helper ", error);
  }
};

module.exports = docxtemplaterHelper;
