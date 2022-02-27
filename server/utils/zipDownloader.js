const file_system = require("fs");

const admz = require("adm-zip");

const downloadZip = (folderPath) => {
  try {
    // this is the name of specific folder which is to be
    // changed into zip file1
    var to_zip = file_system.readdirSync(folderPath);

    // zp is created as an object of class admz() which
    // contains functionalities
    var zp = new admz();

    // this is the main part of our work!
    // here for loop check counts and passes each and every
    // file of our folder "upload_data"
    // and convert each of them to a zip!
    for (var k = 0; k < to_zip.length; k++) {
      zp.addLocalFile(folderPath + "/" + to_zip[k]);
    }

    // toBuffer() is used to read the data and save it
    // for downloading process!
    const data = zp.toBuffer();

    return data;
  } catch (error) {
    console.log("error while converting folder into zip : ", error);
    return null;
  }
};

module.exports = downloadZip;
