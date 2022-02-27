import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";

import DocViewer from "./DocViewer";
import { downloadFileFromServer } from "../services";

const FilePreviewCard = (props) => {
  const imageSource = `${process.env.REACT_APP_FILE_HOST_URL}/${props.title}?raw=true`;
  console.log("image source is ", imageSource);

  const downloadFile = async () => {
    const reqObj = {
      fullPath: props.fullPath,
      originalName: props.title,
    };
    const isDownloaded = await downloadFileFromServer(reqObj);
  };
  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 300, maxWidth: 345 }}>
        <CardActionArea onClick={downloadFile}>
          {/* <CardMedia
            component="img"
            height="120"
            image="/msword.png"
            alt={props.title}
          /> */}
          <CardContent>
            <DocViewer source={imageSource} />
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ alignItems: "center", justifyContent: "center" }}>
          <Button
            size="small"
            color="primary"
            endIcon={<DownloadIcon />}
            onClick={downloadFile}
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FilePreviewCard;
