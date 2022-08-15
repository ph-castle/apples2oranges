import React from "react";
import { Button, Box, Input, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: 200,
  width: 400,
  lineHeight: "200px",
}));
export const Lobby = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      minHeight="100vh"
    >
      <Box>
        <Typography variant="h3" sx={{ mt: "1em" }}>
          Join a Game
        </Typography>
        <Typography variant="h5" sx={{ mt: "1em" }}>
          Enter the session code for the game you want to join
        </Typography>
        <Box
          gap={1}
          sx={{
            mt: "2em",
            mb: "3em",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Input placeholder="Session Code" />
          <Button variant="contained">Join</Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ mt: "1em" }}>
          Join a public game
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { sm: "1fr", md: "repeat(3, 1fr)" },
            gap: "2em",
            mt: "1em",
          }}
          style={{ marginTop: "1em" }}
        >
          {[0, 1, 2].map((elevation) => (
            <Item key={elevation} elevation={8}>
              Game
            </Item>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
