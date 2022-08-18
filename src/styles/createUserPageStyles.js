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
  width: "25ch",
  outline: "white solid 1px",
  boxShadow: "0 0 10px orange",
  "&:hover": {
    boxShadow: "0 0 20px orange",
  },
});
