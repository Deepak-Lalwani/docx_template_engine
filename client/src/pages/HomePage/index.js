import * as React from "react";
import { withStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import StartApplication from "../StartApplication";
import ReadyToUseTemplates from "../../components/ReadyToUseTemplates";
import ReadyToUseData from "../../components/ReadyToUseData";

const styles = (theme) => ({
  introduction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "40%",
    paddingLeft: "2%",
    height: "110vh",
  },
  introductionPara: {
    fontSize: "2rem",
    color: "#333",
    lineHeight: "1.5",
  },
  firstLetter: {
    fontSize: "10rem",
    display: "block",
    float: "left",
    lineHeight: 0.5,
    marginRight: "1%",
    marginTop: "4%",
  },
  getStartedButton: {
    margin: "15px",
  },
  hr: {
    width: "90%",
    border: "solid 1px black",
  },
  applicationContainer: {
    //marginTop: "calc(100vh - 300px)",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: ".1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.startApplication = React.createRef();
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.introduction}>
          <Typography
            variant="h5"
            component="h6"
            className={classes.introductionPara}
          >
            <span className={classes.firstLetter}>A</span> simple and easy way
            to populate data from an excel file to a predefined word template.{" "}
            <br />
            The process is divided into 3 easy steps. Click on " Let's Get
            Started" to create your document in less than 60 seconds.{" "}
          </Typography>
          <hr className={classes.hr} />
          <Button
            variant="contained"
            className={classes.getStartedButton}
            endIcon={<DoubleArrowIcon />}
            onClick={() => {
              this.startApplication.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Let's Get Started
          </Button>
        </div>
        <div
          className={classes.applicationContainer}
          ref={this.startApplication}
        >
          <StartApplication />
        </div>
        <div>
          <ReadyToUseTemplates />
        </div>
        <div>
          <ReadyToUseData />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
