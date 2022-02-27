import * as React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";

import HomePage from "../../pages/HomePage";

export default function Main() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HomePage />
      <Outlet />
    </Box>
  );
}
