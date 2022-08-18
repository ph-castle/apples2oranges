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
  border: "1px solid yellow",
  backgroundColor: "green",
  //   height: "100%",
  display: "flex",
  alignItems: "center",
  //   marginTop: "1rem",
});

export const StyledTypography = styled(Typography)({});

export const StyledInputLabel = styled(InputLabel)({
  //   color: "orange",
  color: "black",
  "&:focus": {
    textShadow: "0 0 10px green",
  },
  "&.Mui-focused fieldset": {
    textShadow: "0 0 10px green",
    borderColor: "#C52328",
    borderWidth: "2px",
  },
});
export const StyledOutlineInput = styled(OutlinedInput)({
  color: "white",
  backgroundColor: "blue",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",
});
export const StyledFormHelperText = styled(FormHelperText)({
  color: "white",
});

export const StyledButton = styled(Button)({
  p: "sm",
  width: "26ch",
});
