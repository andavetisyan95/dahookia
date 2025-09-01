"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0", // синий
    },
    secondary: {
      main: "#ff6f00", // оранжевый
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  },
});
theme = responsiveFontSizes(theme);

export default theme;
