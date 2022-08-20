import {
  Box,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';

export const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "flexStart",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "1200px",
  height: "90vh",
  minWidth: '400px',
  margin: "0 auto",
  padding: "2rem",
  background: 'rgba(0,0,0,0.6)'
});

export const StyledGrid = styled(Grid)({
  overflow: 'scroll',
  height: '80vh',
});

export const StyledGridLeft = styled(Grid)({

});

export const StyledGridRight = styled(Grid)({
  borderStyle: 'solid',
  position: "relative",
  height: "600px",
});

export const StyledTextField = styled(TextField)({
  color: "white",
  backgroundColor: "grey",
  width: "80%",
  maxRows: 3,
  position: "sticky",
  bottom: "5%",
  left: "1%",
  margin: 2,
});

export const StyledSendIcon = styled(SendIcon)({
  position: "sticky",
  bottom: "5%",
  right: "1%",
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
  width: '80%',
});