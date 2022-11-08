import React from "react";
import { ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleAnimation } from "../app/mainSlice";
import { useDispatch } from "react-redux";
import {
  StyledComponentContainer,
  StyledDashButtons,
} from "../styles/globalStyles";

export const NoMatch = () => {
  const dispatch = useDispatch();
  return (
    <StyledComponentContainer>
      <h2>Page Not Found</h2>
      <ButtonGroup
        variant="contained"
        onClick={() => dispatch(toggleAnimation())}
      >
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <StyledDashButtons
            fontSize={{ xs: "0.5rem", sm: "1rem", md: "1.5rem" }}
            sx={{
              marginRight: "1rem",
              fontSize: {
                xs: "0.5rem",
                sm: "1rem",
                md: "1.5rem",
              },
              backgroundColor: "#212529",
              "&:hover": {
                backgroundColor: "#343a40",
              },
            }}
          >
            Return to Dashboard
          </StyledDashButtons>
        </Link>
      </ButtonGroup>
    </StyledComponentContainer>
  );
};
