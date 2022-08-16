import { createTheme } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: red[500],
    },
  },
});
