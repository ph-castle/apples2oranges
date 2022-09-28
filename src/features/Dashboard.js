import React from "react";
import { ButtonGroup } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { toggleAnimation } from "../app/mainSlice";
import { useDispatch } from "react-redux";
import {
  StyledComponentContainer,
  StyledDashButtons,
} from "../styles/globalStyles";
import { StyledContainer } from '../styles/appStyles';

export const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    // <StyledContainer>
    <StyledComponentContainer>
      <ButtonGroup
        variant="contained"
        onClick={() => dispatch(toggleAnimation())}
      >
        <Link to={"/joingame"} style={{ textDecoration: "none" }}>
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
            Join a Game
          </StyledDashButtons>
        </Link>
        <Link to={"creategame"} style={{ textDecoration: "none" }}>
          <StyledDashButtons
            sx={{
              fontSize: {
                xs: "0.5rem",
                sm: "1rem",
                md: "1.5rem",
              },
              backgroundColor: "#868e96",
              "&:hover": {
                backgroundColor: "#adb5bd",
              },
            }}
          >
            Create A Game
          </StyledDashButtons>
        </Link>
      </ButtonGroup>
    </StyledComponentContainer>
    // <Outlet />
    // </StyledContainer>
  );
};

export default Dashboard;
