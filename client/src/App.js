import AppRoutes from "./routers/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, blue } from "@mui/material/colors";

import "./App.css";

function App() {
  const theme = createTheme({
    gradient: {
      primary: {
        mainGradient:
          "linear-gradient( 136deg, rgb(14,29,80) 0%, rgb(18,59,130) 50%, rgb(25,118,210) 100%)",
        //"linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      },
    },
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
