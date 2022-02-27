import * as React from "react";
import { withStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LinearProgress from "@mui/material/LinearProgress";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import ColorlibStepIcon from "../../components/ColorlibStepIcon";
import ColorlibConnector from "../../components/ColorlibConnector";

import UploadTemplate from "../../components/Steps/UploadTemplate";
import UploadData from "../../components/Steps/UploadData";
import GenerateFiles from "../../components/Steps/GenerateFiles";
import ErrorStep from "../../components/Steps/ErrorStep";

import { saveTemplate, saveDataSheet, generateFiles } from "../../services";

const styles = (theme) => ({
  startApplicationContainer: {
    height: "80vh",
  },
  dropBoxContainer: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    border: "2px solid " + theme.palette.primary.main,
    boxShadow: theme.shadows[5],
    borderRadius: "20px",
    padding: "10px",
  },
});

const steps = [
  "Select a .docx template",
  "Upload data in excel sheet",
  "Generate your files!!",
];

class StartApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      templateFile: null,
      templatePath: null,
      excelFile: null,
      inputDataJson: null,
      templateName: "generated",
      disableNext: true,
      error: null,
      transitionDirection: "left",
      uploadProgress: 0,
      downloading: false,
      downloadSuccess: false,
      downloadFailure: false,
    };
  }

  renderStep(activeStep) {
    if (
      this.state.error &&
      this.state.error.step > -1 &&
      this.state.error.errorMessage
    ) {
      return (
        <ErrorStep error={this.state.error} handleReset={this.handleReset} />
      );
    }
    switch (activeStep) {
      case 0:
        return (
          // <Slide
          //   direction={this.state.transitionDirection}
          //   in={true}
          //   //mountOnEnter
          //   //unmountOnExit
          // >
          <UploadTemplate
            handleTemplateUpload={this.handleTemplateUpload}
            templateFile={this.state.templateFile}
            transitionDirection={this.state.transitionDirection}
          />
          // </Slide>
        );
      case 1:
        return (
          // <Slide
          //   direction={this.state.transitionDirection}
          //   in={true}
          //   //mountOnEnter
          //   //unmountOnExit
          // >
          <UploadData
            handleDataUpload={this.handleDataUpload}
            excelFile={this.state.excelFile}
            transitionDirection={this.state.transitionDirection}
          />
          // </Slide>
        );
      case 2:
        return (
          <GenerateFiles
            transitionDirection={this.state.transitionDirection}
            handleDownload={this.handleDownload}
            loading={this.state.downloading}
            success={this.state.downloadSuccess}
            failure={this.state.downloadFailure}
          />
        );
      default:
        return <ErrorStep error={this.state.error} />;
    }
  }

  isStepFailed = (step) => {
    return step === 1;
  };

  handleNext = async () => {
    switch (this.state.activeStep) {
      case 0:
        const templateData = await saveTemplate(
          this.state.templateFile[0],
          this.setProgress
        );
        console.log("templateData is ", templateData);
        const templatePath = templateData.data;
        if (templatePath) {
          this.setState({
            templatePath,
            error: null,
            transitionDirection: "left",
          });
        } else {
          this.setState({
            error: {
              step: 0,
              errorMessage:
                templateData.error || "Error while uploading template",
              transitionDirection: "right",
            },
          });
        }
        break;
      case 1:
        const sheetData = await saveDataSheet(
          this.state.excelFile[0],
          this.setProgress
        );
        const inputDataJson = sheetData.data;
        if (inputDataJson) {
          this.setState({
            inputDataJson,
            error: null,
            transitionDirection: "left",
          });
        } else {
          this.setState({
            error: {
              step: 1,
              errorMessage:
                sheetData.error ||
                "Error while uploading data sheet, please try again",
            },
            transitionDirection: "right",
          });
        }
        break;
      default:
        break;
    }
    this.setState({
      activeStep: this.state.activeStep + 1,
      disableNext: true,
      uploadProgress: 0,
      downloading: false,
      downloadSuccess: false,
      downloadFailure: false,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
      transitionDirection: "right",
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      templateFile: null,
      excelFile: null,
      inputDataJson: null,
      error: null,
      disableNext: true,
      transitionDirection: "right",
      uploadProgress: 0,
      downloading: false,
      downloadSuccess: false,
      downloadFailure: false,
    });
  };

  handleTemplateUpload = (templateFile) => {
    console.log("file uploaded is ", templateFile);
    if (templateFile.length > 0) {
      this.setState({ templateFile, disableNext: false });
    }
  };

  handleDataUpload = (excelFile) => {
    console.log("excel file uploaded is ", excelFile);
    if (excelFile.length > 0) {
      this.setState({ excelFile, disableNext: false });
    }
  };

  handleDownload = async () => {
    this.setState({ downloading: true }, async () => {
      const generatedFiles = await generateFiles(
        this.state.templateName,
        this.state.templatePath,
        this.state.inputDataJson
      );
      if (generatedFiles) {
        this.setState({ downloading: false, downloadSuccess: true });
      } else {
        this.setState({
          downloading: false,
          downloadFailure: true,
          error: {
            step: 2,
            errorMessage: "Error while downloading files!!",
          },
          transitionDirection: "right",
        });
      }
      console.log("generated files is", generatedFiles);
    });
  };

  setProgress = (uploadProgress) => {
    const disableNext = uploadProgress === 100;
    this.setState({ uploadProgress, disableNext });
  };

  render() {
    console.log("this.state is ", this.state);
    const { classes } = this.props;
    return (
      <div className={classes.startApplicationContainer}>
        <div>
          <Stepper
            alternativeLabel
            activeStep={this.state.activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => {
              const labelProps = {};
              if (this.state.error && this.state.error.step === index) {
                labelProps.optional = (
                  <Typography
                    sx={{ ml: "30%" }}
                    variant="caption"
                    color="error"
                  >
                    {this.state.error.errorMessage}
                  </Typography>
                );

                labelProps.error = true;
              }
              return (
                <Step key={label}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={ColorlibStepIcon}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <Box className={classes.dropBoxContainer}>
          <div>{this.renderStep(this.state.activeStep)}</div>
        </Box>
        {this.state.activeStep !== steps.length - 1 && (
          <Box sx={{ width: "90%", ml: "6%", mt: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={this.state.uploadProgress}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`${Math.round(this.state.uploadProgress)}%`}</Typography>
              </Box>
            </Box>
          </Box>
        )}
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              mx: 6,
              mt: 3,
              pb: 4,
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              disabled={
                this.state.activeStep === 0 ||
                (this.state.error &&
                  this.state.error.step > -1 &&
                  this.state.error.errorMessage)
              }
              onClick={this.handleBack}
              sx={{ ml: 2 }}
            >
              Back
            </Button>

            <Box sx={{ flex: "1 1 auto" }} />
            {this.state.activeStep === steps.length - 1 ? (
              <React.Fragment>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  endIcon={<RestartAltIcon />}
                  onClick={this.handleReset}
                  disabled={this.state.downloading}
                >
                  Start Over
                </Button>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  endIcon={<DownloadForOfflineIcon />}
                  onClick={this.handleDownload}
                  disabled={
                    this.state.downloading || this.state.downloadFailure
                  }
                >
                  Download Your Files
                </Button>
              </React.Fragment>
            ) : (
              <Button
                sx={{ mr: 1 }}
                variant="contained"
                disabled={this.state.disableNext}
                onClick={this.handleNext}
              >
                Next Step
              </Button>
            )}
          </Box>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(StartApplication);
