import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import { makeStyles } from "@mui/styles";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
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
  errorMessage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 20,
    fontWeight: 84,
    textAlign: "center",
  },
}));

const ErrorStep = (props) => {
  const classes = useStyles();

  return (
    <Slide
      direction={props.transitionDirection || "left"}
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
            className={classes.errorIcon}
          >
            <ErrorIcon />
          </Fab>
        </Box>
        <div className={classes.errorMessage}>
          {props.error && props.error.errorMessage ? (
            <p>{props.error.errorMessage}</p>
          ) : (
            <p>
              An error occured while downloading your files, Please Start Over
            </p>
          )}
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            endIcon={<RestartAltIcon />}
            onClick={props.handleReset}
          >
            Start Over
          </Button>
        </div>
      </div>
    </Slide>
  );
};
export default ErrorStep;
