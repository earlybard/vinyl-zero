"use client";
import { createTheme } from '@mui/material/styles';
import {yellow,} from "@mui/material/colors";
const lightTheme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[200]
    },
    background: {
      default: "#020617",
      paper: "#0f172a"
    }
  }
});
const theme = {
  light: lightTheme,
  dark: darkTheme
};

export default darkTheme;
