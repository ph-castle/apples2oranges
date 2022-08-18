import React from "react";
import { Button, Box, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleAnimation } from "../app/mainSlice";
import { useDispatch, useSelector } from "react-redux";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const animationtoggle = useSelector((state) => state.main.animationtoggle);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap="12px"
    >
      <ButtonGroup
        variant="contained"
        onClick={() => dispatch(toggleAnimation())}
      >
        <Link to={"/joingame"} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              p: "1rem",
              outline: "white 2px solid",
              fontSize: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
              marginRight: "1rem",
              backgroundColor: "secondary.bold",
            }}
          >
            Join a Game
          </Button>
        </Link>
        <Link to={"/creategame"} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              p: "1rem",
              outline: "white 2px solid",
              fontSize: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
            }}
          >
            Create A Game
          </Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default Dashboard;
