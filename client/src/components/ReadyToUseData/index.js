import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Divider, Box, Grid, Typography } from "@mui/material";

import FilePreviewCard from "../FilePreviewCard";
import { getDataExcelFromServer } from "../../services";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "50px",
    //padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    lineHeight: "1.5",
  },
  cardContainer: {
    marginTop: "50px",
  },
}));

const ReadyToUseData = (props) => {
  const classes = useStyles();

  const [dataExcel, setDataExcel] = useState(null);
  useEffect(() => {
    try {
      getDataExcel();
    } catch (error) {
      console.log("error catch block");
    }
  }, []);

  const getDataExcel = async () => {
    const response = await getDataExcelFromServer();

    if (response.data && response.data.length > 0) {
      setDataExcel(response.data);
    }

    dataExcel?.map((dataExcel) => {
      console.log(dataExcel.originalName);
    });
  };

  return (
    dataExcel?.length > 0 && (
      <div className={classes.container}>
        <Divider style={{ width: "90%" }}>
          <Typography variant="h5" component="h6" className={classes.title}>
            Ready To Use Data Files
          </Typography>
        </Divider>

        <Box sx={{ flexGrow: 1 }} className={classes.cardContainer}>
          <Grid container spacing={20}>
            {dataExcel.map((excel) => (
              <FilePreviewCard
                title={excel.originalName}
                fullPath={excel.fullPath}
              />
            ))}
          </Grid>
        </Box>
      </div>
    )
  );
};

export default ReadyToUseData;
