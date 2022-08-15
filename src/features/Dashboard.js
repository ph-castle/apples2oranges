import React from "react";
import { Button, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap="12px"
    >
      <Button variant="contained" sx={{ p: "1em" }}>
        Join a Game
      </Button>
      <Button variant="contained" sx={{ p: "1em" }}>
        Create A Game
      </Button>
    </Box>
  );
};

export default Dashboard;
