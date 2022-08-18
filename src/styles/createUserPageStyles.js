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
  marginTop: "1rem",
});

export const StyledButton = styled(Button)({
  p: "sm",
  width: "26ch",
});

export const StyledTypography = styled(Typography)({
  fontSize: {
    sm: "1.5rem",
    md: "2rem",
  },
  color: "black",
  backgroundColor: "white",
  padding: "1rem",
  width: "50%",
  margin: "auto",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const StyledInputLabel = styled(InputLabel)({});
export const StyledOutlineInput = styled(OutlinedInput)({});
export const StyledFormHelperText = styled(FormHelperText)({});
