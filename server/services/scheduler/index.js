var cron = require("node-cron");

const {
  deleteTemplates,
  deleteInputDataExcel,
  deleteGeneratedFiles,
} = require("../delete");

const deleteEveryFiveMins = () => {
  //For testing purpose, running a task every 30 seconds
  //cron.schedule("*/30 * * * * *", async () => {

  cron.schedule("*/3 * * * *", async () => {
    console.log("running a task every 3 mins", new Date());
    deleteTemplates();
    deleteInputDataExcel();
    deleteGeneratedFiles();
  });
};

const scheduler = () => {
  deleteEveryFiveMins();
};

module.exports = scheduler;
