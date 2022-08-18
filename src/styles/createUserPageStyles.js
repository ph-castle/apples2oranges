import {
  Typography,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { styled } from "@mui/material/styles";

export const StyledFormControl = styled(FormControl)({
  width: "25ch",
});

export const StyledTypography = styled(Typography)({
  padding: "1rem",
  fontFamily: "roboto",
  textShadow: "0 0 10px white",
  fontWeight: "800",
  color: "white",
});

export const StyledInputLabel = styled(InputLabel)({
  //   color: "orange",
  color: "black",
  "&:focus": {
    textShadow: "0 0 10px green",
  },
  "&.Mui-focused fieldset": {
    textShadow: "0 0 10px green",
    borderColor: "#C52328 1px solid",
    borderWidth: "2px",
  },
});
export const StyledOutlineInput = styled(OutlinedInput)({
  color: "black",
  backgroundColor: "white",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",
});
export const StyledFormHelperText = styled(FormHelperText)({
  color: "white",
});

export const StyledButton = styled(Button)({
  // p: "sm",
  // // width: "26ch",
  p: "sm",
  width: "25ch",
  mt: "2rem",
});
