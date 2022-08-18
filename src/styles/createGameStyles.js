import {
  Box,
  FormGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledMenuItem = styled(MenuItem)({
  fontSize: {
    sm: "1.5rem",
    md: "2rem",
  },
  padding: "1rem",
  color: "black",
  backgroundColor: "white",
});

export const StyledSelect = styled(Select)({
  fontSize: {
    sm: "1.5rem",
    md: "2rem",
  },
  padding: "1rem",
  color: "black",
  backgroundColor: "white",
});

// export const StyledComponentContainer = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   flexDirection: "column",
//   gap: "1rem",
//   width: "100%",
//   maxWidth: "1200px",
//   height: "100%",
//   margin: "auto",
//   backgroundColor: "yellow",
//   padding: "2rem",
// });

export const StyledFormGroup = styled(FormGroup)({
  height: "18rem",
  display: "flex",
  justifyContent: "space-evenly",
  mt: "1rem",
});

export const StyledFormControl = styled(FormControl)({
  m: 1,
  minWidth: "2rem",
  mb: "1rem",
  width: "50%",
});

export const StyledButton = styled(Button)({
  width: "10rem",
  mt: "2rem",
});

export const StyledInputLabel = styled(InputLabel)({
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

export const StyledTextField = styled(TextField)({
  m: 1,
  minWidth: "2rem",
  mb: "1rem",
  color: "black",
});

export const StyledCheckbox = styled(Checkbox)({
  m: 1,
  minWidth: "2rem",
  mb: "1rem",
  color: "black",
  backgroundColor: "white",
});

export const StyledFormControlLabel = styled(FormControlLabel)({
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
});
