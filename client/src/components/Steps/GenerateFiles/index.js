import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { green } from "@mui/material/colors";

import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CheckIcon from "@mui/icons-material/Check";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import ErrorIcon from "@mui/icons-material/Error";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.common.grey} !important`,
    borderRadius: "18px !important",
    padding: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  errorIcon: {
    backgroundColor: theme.palette.error.main,
  },
  downloadArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 20,
    fontWeight: 84,
    textAlign: "center",
  },
}));

const GenerateFiles = (props) => {
  const classes = useStyles();

  return (
    <Slide
      direction={props.transitionDirection}
      in={true}
      timeout={700}
      //mountOnEnter
      //unmountOnExit
    >
      <div className={classes.container}>
        <Box sx={{ m: "30px", position: "relative" }}>
          <Fab
            aria-label="save"
            color="primary"
            size="large"
            className={props.failure && classes.errorIcon}
          >
            {props.failure ? (
              <ErrorIcon />
            ) : props.success ? (
              <CheckIcon />
            ) : (
              <SnippetFolderIcon />
            )}
          </Fab>
          {props.loading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        <div className={classes.downloadArea}>
          {props.failure ? (
            <p>
              An error occured while downloading your files, Please Start Over
            </p>
          ) : (
            <p>Your Files are ready to download</p>
          )}
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            endIcon={<DownloadForOfflineIcon />}
            onClick={props.handleDownload}
            disabled={props.loading || props.failure}
          >
            Download Your Files
          </Button>
        </div>
      </div>
    </Slide>
  );
};

export default GenerateFiles;
