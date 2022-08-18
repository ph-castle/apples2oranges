import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0,0,0, 0.8)",
  overflow: "hidden",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "12px",
  width: "50%",
  margin: "auto",
  mt: 4,
});
