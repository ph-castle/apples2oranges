import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap="12px"
    >
      <Button variant="contained" sx={{ p: "sm" }}>
        <Link to="/joingame">Join a Game</Link>
      </Button>
      <Button variant="contained" sx={{ p: "sm" }}>
        <Link to="/creategame">Create A Game</Link>
      </Button>
    </Box>
  );
};

export default Dashboard;
