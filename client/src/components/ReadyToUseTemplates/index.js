import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Divider, Box, Grid, Typography } from "@mui/material";

import FilePreviewCard from "../FilePreviewCard";
import { getTemplatesFromServer } from "../../services";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
    padding: "40px",
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

const ReadyToUseTemplates = (props) => {
  const classes = useStyles();

  const [templates, setTemplates] = useState(null);
  useEffect(() => {
    try {
      getTemplates();
    } catch (error) {
      console.log("error catch block");
    }
  }, []);

  const getTemplates = async () => {
    const response = await getTemplatesFromServer();

    if (response.data && response.data.length > 0) {
      setTemplates(response.data);
    }

    templates?.map((template) => {
      console.log(template.originalName);
    });
  };

  return (
    templates?.length > 0 && (
      <div className={classes.container}>
        <Divider style={{ width: "90%" }}>
          <Typography variant="h5" component="h6" className={classes.title}>
            Ready To Use Templates
          </Typography>
        </Divider>

        <Box sx={{ flexGrow: 1 }} className={classes.cardContainer}>
          <Grid container spacing={20}>
            {templates.map((template) => (
              <FilePreviewCard
                title={template.originalName}
                fullPath={template.fullPath}
              />
            ))}
          </Grid>
        </Box>
      </div>
    )
  );
};

export default ReadyToUseTemplates;
