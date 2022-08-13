import React from "react";
import { Button, Container, Box } from "@mui/material";

export const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap="12px"
      >
        <Button variant="contained" sx={{ p: "sm" }}>
          Join a Game
        </Button>
        <Button variant="contained" sx={{ p: "sm" }}>
          Create A Game
        </Button>
      </Box>
    </Container>
  );
};
