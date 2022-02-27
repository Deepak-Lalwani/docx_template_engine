import axios from "axios";
import fileSaver from "file-saver";

import { getResponse } from "./utils";

const saveTemplate = async (template, setProgress) => {
  try {
    var formData = new FormData();
    formData.append("templates/ph_letter", template);
    const response = await axios.post("/api/template", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    console.log("response is....", response);

    if (
      response &&
      response.status == 200 &&
      response.data &&
      response.data.success &&
      response.data.data &&
      response.data.data.templatePath
    ) {
      return getResponse(response.data.data.templatePath, null);
    } else {
      return getResponse(
        null,
        response?.data?.errorMessage || "Error while saving template on server"
      );
    }
  } catch (error) {
    console.log("Error while saving template on server", error);
    return getResponse(null, "Server Error while saving template");
  }
};

const saveDataSheet = async (dataSheet, setProgress) => {
  try {
    var formData = new FormData();
    formData.append("inputData", dataSheet);
    const response = await axios.post("/api/inputData", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    console.log("input data response is....", response);

    if (
      response &&
      response.status == 200 &&
      response.data &&
      response.data.success &&
      response.data.data
    ) {
      return getResponse(response.data.data, null);
    } else
      return getResponse(
        null,
        response?.data?.errorMessage || "Error while saving excel on server"
      );
  } catch (error) {
    console.log("Error while saving template on server", error);
    return getResponse(null, "Server Error while saving excel");
  }
};

const generateFiles = async (templateName, templatePath, inputData) => {
  try {
    const reqObj = {
      templateName,
      templatePath,
      inputData,
    };
    const response = await axios.post("/api/generate", reqObj, {
      responseType: "blob",
    });
    console.log("generated file  response is....", response);

    if (response && response.status == 200 && response.data) {
      var blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      console.log("blob is", blob);
      fileSaver.saveAs(blob, "generated_files.zip");
      return true;
    } else return null;
  } catch (error) {
    console.log("Error while saving template on server", error);
    return null;
  }
};

const getTemplatesFromServer = async () => {
  try {
    const response = await axios.get("/api/template");
    console.log("input data response is....", response);

    if (
      response &&
      response.status == 200 &&
      response.data &&
      response.data.success &&
      response.data.data
    ) {
      return getResponse(response.data.data, null);
    } else
      return getResponse(
        null,
        response?.data?.errorMessage || "Error while trying to get templates"
      );
  } catch (error) {
    console.log("Error while trying to get templates", error);
    return getResponse(null, "Server Error while trying to get templates");
  }
};

const getDataExcelFromServer = async () => {
  try {
    const response = await axios.get("/api/inputData");
    console.log("input data response is....", response);

    if (
      response &&
      response.status == 200 &&
      response.data &&
      response.data.success &&
      response.data.data
    ) {
      return getResponse(response.data.data, null);
    } else
      return getResponse(
        null,
        response?.data?.errorMessage ||
          "Error while trying to get data excel files"
      );
  } catch (error) {
    console.log("Error while trying to get data excel files", error);
    return getResponse(null, "Server Error while trying to get excel files");
  }
};

const downloadFileFromServer = async (filePath) => {
  try {
    const reqObj = { filePath };
    const response = await axios.post("/api/download", reqObj, {
      responseType: "blob",
    });
    console.log("downloaded file  response is....", response);

    if (response && response.status == 200 && response.data) {
      var blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      console.log("blob is", blob);
      fileSaver.saveAs(blob, filePath.originalName || "sample");
      return true;
    } else return null;
  } catch (error) {
    console.log("Error while downloading template from server", error);
    return null;
  }
};

export {
  saveTemplate,
  saveDataSheet,
  generateFiles,
  getTemplatesFromServer,
  getDataExcelFromServer,
  downloadFileFromServer,
};
