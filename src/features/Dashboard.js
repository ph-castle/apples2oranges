import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap="12px"
    >
      <Link to={"/joingame"}>
        <Button variant="contained" sx={{ p: "1em" }}>
          Join a Game
        </Button>
      </Link>
      <Link to={"/creategame"}>
        <Button variant="contained" sx={{ p: "1em" }}>
          Create A Game
        </Button>
      </Link>
    </Box>
  );
};

export default Dashboard;
