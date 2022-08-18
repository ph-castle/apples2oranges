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

export const StyledContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "1000px",
  height: "100%",
  // margin: "0 auto",
  padding: "2rem",
  // height: "100%",
});

export const StyledInnerBox = styled(Box)({
  // padding: "2rem",
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "rgba(255, 165, 0, 0.4)",
  width: '50%',
  margin: '0 auto'
});

export const StyledTextField = styled(TextField)({
  color: "black",
  backgroundColor: "grey",
  width: '80%',
  // margin: 'auto',
  borderRadius: '5px',
  '&.css-lr6geh-MuiFormLabel-root-MuiInputLabel-root': {
    color: 'black',
  }
});

export const StyledInputLabel = styled(InputLabel)({
  color: "black",
});

export const StyledSelect = styled(Select)({
  color: "black",
  backgroundColor: "white",
  width: '80%',

});

export const StyledMenuItem = styled(MenuItem)({
  color: "black",
  backgroundColor: "white",

});

export const StyledFormGroup = styled(FormGroup)({
  // height: "18rem",
  // display: "flex",
  width: '100%',
  // justifyContent: 'center',
  // alignItems: 'center',
  // backgroundColor: "orange",
});

export const StyledCheckboxContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  marginTop: "1rem",
  // justifyContent: "center",
  alignItems: "space-between",
  flexDirection: "column",
});

export const StyledFormControlLabel = styled(FormControlLabel)({
  padding: "0.8em",
  textAlign: "start",
  outline: "white solid 1px",
  margin: '0 auto',
  width: '60%'
});

export const StyledCheckbox = styled(Checkbox)({
  color: "orange",
  '&.Mui-checked': {
    color: 'orange',
  }
});

export const StyledFormControl = styled(FormControl)({
  marginTop: "1em",
  width: '100%',
  marginLeft: '3em'
});

export const StyledTypography = styled(Typography)({
  padding: "1rem",
  fontFamily: "roboto",
  textShadow: "0 0 10px white",
  fontWeight: "800",
  fontSize: {
    xs: "1rem",
    sm: "1.5rem",
    md: "1.8rem",
    lg: "2rem",
  },
  color: "white",
});

export const StyledButton = styled(Button)({
  fontSize: {
    sm: "1.5rem",
    md: "2rem",
  },
  padding: "0.8em",
  outline: "1px solid orange",
});
