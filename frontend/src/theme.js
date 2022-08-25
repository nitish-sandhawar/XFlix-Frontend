import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "#282424",
        contrastText: "#fff",
        light: "#606060"
      },
      secondary:{
        main: "#181818",
        contrastText: "#fff",
      }
    },
  });

  export default theme;