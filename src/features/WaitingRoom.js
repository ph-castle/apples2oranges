import React from "react";
import { useParams } from "react-router-dom";
import { lobbyClient } from "./utils/lobbyClient";
import { Box, Typography, Button, List, ListItem, ListItemText, createTheme, ThemeProvider } from "@mui/material";
// import { LobbyClient } from "boardgame.io/client";

export const WaitingRoom = () => {
  // const lobbyClient = new LobbyClient({ se rver: 'localhost:3000'});
  // var {players, matchID} = await lobbyClient.getMatch('game', 'matchID');
  const { matchId } = useParams();

  lobbyClient
    .getMatch({

    })

  var players = [];

  return (
    <Box
      sx={{
        display:"flex",
        maxWidth: 500,
        height: "80vh",
        flexDirection:"column",
        p:'1rem',
        ml: {md: '2rem'},
        mt: '0.5rem'
      }}
    >
      <Typography variant="h4" sx={{fontSize: {xs:'1.7rem', sm: '2rem', md:'2.2rem'}, mt: '0.6rem'}}>Waiting for players</Typography>
      <Button variant="contained" sx={{p:'0.5rem', mt: '1rem', fontSize: {sm: '1rem',md:'1.2rem'}}}>MathID</Button>
      <Box>
      <List sx={{ width: '100%', maxHeight: 400, bgcolor: 'color', p: '1rem', overflowY:'scroll' }}>
        {players.map((value, index) => (
        <ListItem
          key={value}
          disableGutters
        >
      <ListItemText primaryTypographyProps={{fontSize: {sm: '18px', md: '20px'}}} primary={`${index + 1}. ${value}`} />
       </ListItem>
        ))}
      </List>
      </Box>
      {(players.length >= 3) ?
      <Button variant="contained" sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}}>Start Game</Button> : null}
    </Box>
  )
}
