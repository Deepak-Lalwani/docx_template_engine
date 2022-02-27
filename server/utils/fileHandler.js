const fs = require("fs");

const getFiles = (dir, files_) => {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var fullPath = dir + "/" + files[i];
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files_);
    } else {
      files_.push({ fullPath, originalName: files[i] });
    }
  }
  return files_;
};

module.exports = getFiles;
