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

export const StyledComponentContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "1200px",
  height: "100%",
  margin: "auto",
  backgroundColor: "yellow",
  padding: "2rem",
});
