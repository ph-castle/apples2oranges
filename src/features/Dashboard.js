import React from "react";
import { Button, Box, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import Hero from "../UI/Hero";

const Dashboard = ({ theme }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap="12px"
    >
      <Hero theme={theme} />
      <ButtonGroup variant="contained" color="secondary">
        <Link to={"/joingame"}>
          <Button>Join a Game</Button>
        </Link>
        <Link to={"/creategame"}>
          <Button>Create A Game</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default Dashboard;
