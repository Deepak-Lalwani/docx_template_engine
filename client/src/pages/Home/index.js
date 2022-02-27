import * as React from "react";
import Box from "@mui/material/Box";

import AppBar from "../../layout/AppBar";
import Main from "../../layout/Main/mainApp";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar />
      <Main />
    </Box>
  );
}
