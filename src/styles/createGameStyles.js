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
  OutlinedInput,
  Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '1200px',
  height: '100%',
  margin: '0 auto',
  padding: '2rem',
  // height: "100%",
});

export const StyledInnerBox = styled(Box)({
  // padding: "2rem",
});

export const StyledTextField = styled(TextField)({
  '& label': {
    color: 'black',
    textShadow: '0 0 1em white',
    borderRadius: '0.25rem',
  },
  '& input': {},
  backgroundColor: 'white',
});

export const StyledInputLabel = styled(InputLabel)({
  color: 'black',
});

export const StyledSelect = styled(Select)({
  color: 'black',
  backgroundColor: 'white',
});

export const StyledMenuItem = styled(MenuItem)({
  color: 'black',
  backgroundColor: 'white',
});

export const StyledFormGroup = styled(FormGroup)({
  // height: "18rem",
  // display: "flex",
  // backgroundColor: "black",
});

export const StyledCheckboxContainer = styled(Box)({
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  marginTop: '1rem',
  // justifyContent: "center",
  alignItems: 'space-between',
  flexDirection: 'column',
});

export const StyledFormControlLabel = styled(FormControlLabel)({
  padding: '0.8em',
  textAlign: 'start',
  outline: 'white solid 1px',
  margin: 'auto',
  // color: "black",
});

export const StyledCheckbox = styled(Checkbox)({
  color: 'orange',
  '&.Mui-checked': {
    color: 'orange',
  },
});

export const StyledFormControl = styled(FormControl)({
  marginTop: '1em',
});

export const StyledTypography = styled(Typography)({
  padding: '1rem',
  fontFamily: 'roboto',
  textShadow: '0 0 10px white',
  fontWeight: '800',
  fontSize: {
    xs: '1rem',
    sm: '1.5rem',
    md: '1.8rem',
    lg: '2rem',
  },
  color: 'white',
});

export const StyledButton = styled(Button)({
  fontSize: {
    sm: '1.5rem',
    md: '2rem',
  },
  padding: '0.8em',
  outline: '1px solid orange',
});

export const StyledOutlineInput = styled(OutlinedInput)({
  color: 'black',
  backgroundColor: '#f1f3f5',

  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",
});
