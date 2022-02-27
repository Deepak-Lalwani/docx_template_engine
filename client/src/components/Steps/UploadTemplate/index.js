import * as React from "react";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";

import { DropzoneArea } from "material-ui-dropzone";
//import { DropzoneAreaBase } from "material-ui-dropzone";

//import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const useStyles = makeStyles((theme) => ({
  dropzoneClass: {
    border: `1px dashed ${theme.palette.common.grey} !important`,
    borderRadius: "18px !important",
    padding: "100px",
  },
  dropzoneTextClass: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeight: 44,
    textAlign: "center",
  },
  previewContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-8% !important",
  },
  dropzonePreviewIcon: {
    width: "150px",
    height: "100px",
  },
}));

const UploadTemplate = (props) => {
  const classes = useStyles();

  const handleChange = (files) => {
    console.log("files uploaded !!");
    props.handleTemplateUpload(files);
  };

  return (
    <Slide
      direction={props.transitionDirection}
      in={true}
      timeout={700}
      //mountOnEnter
      //unmountOnExit
    >
      <div>
        <DropzoneArea
          dropzoneClass={classes.dropzoneClass}
          dropzoneParagraphClass={classes.dropzoneTextClass}
          previewGridClasses={{
            container: classes.previewContainer,
          }}
          filesLimit={1}
          acceptedFiles={[
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]}
          Icon={UploadFileIcon}
          dropzoneText={
            "Click to upload file OR Just Drop the files here, if you are a Butterfingers!! ;)"
          }
          showFileNames={true}
          //getPreviewIcon={() => <DescriptionIcon />}
          getPreviewIcon={(file) => {
            if (
              file &&
              file.file.type.split("/")[1] ===
                "vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
              return (
                <img
                  className={classes.dropzonePreviewIcon}
                  role="presentation"
                  src={"/msword.png"}
                />
              );
          }}
          onChange={(files) => handleChange(files)}
          onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
          clearOnUnmount={false}
          initialFiles={props.templateFile ? props.templateFile : []}
        />
      </div>
    </Slide>
  );
};

export default UploadTemplate;
