import React, {useState, useEffect} from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider } from "@mui/material";
import { useParams } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from '../game/Apples';
import { ApplesBoard } from '../game/ApplesBoard';
import { lobbyClient } from './utils/lobbyClient'
import { useSelector } from "react-redux";

export const WaitingRoom = () => {

  const { matchID } = useParams();
  const [players, setPlayers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const playerID = useSelector((state) => state.playerID);
  const playerCredentials = useSelector((state) => state.playerCredentials);

console.log(playerID);
  const ApplesClient = Client({
    game: Apples,
    board: ApplesBoard,
    matchID: matchID,
    debug: true,
    numPlayers: players.length,
    multiplayer: SocketIO({server: 'localhost:8000'})
    });


useEffect(() => {
  const interval = setInterval(() => {
    lobbyClient.getMatch('Apples2Oranges', matchID)
      .then(({players}) => {
        console.log(players);
        setPlayers(players);
        const currPlayers = players.filter((player) => player.name);
        if (currPlayers.length === players.length) {
          setShow(true); //everyone has joined, show them the board
        }
      })
  }, 500);
  if(show) {
    clearInterval(interval);
  }
  return () => {
    clearInterval(interval);
  };

}, [show, players.length, matchID]);


// const leaveRoom = () => {

console.log(localStorage.getItem("id"));

if(show) {
  return (
    <ApplesClient
     matchID={matchID}
     numPlayers={players.length}
     playerID={localStorage.getItem("id")}
     credentials={localStorage.getItem("credentials")}
     />
  );
} else {
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
      <Box sx={{textAlign: 'center', background: 'blue', p:'0.5rem', mt: '1rem', fontSize: {sm: '1rem',md:'1.2rem'}}}>{matchID}</Box>
      <Box>
      <List sx={{ width: '100%', maxHeight: 400, bgcolor: 'color', p: '1rem', overflowY:'scroll' }}>
        {players.map((value, index) => (
        <ListItem
          key={value + index}
          disableGutters
        >
      <ListItemText primaryTypographyProps={{fontSize: {sm: '18px', md: '20px'}}} primary={`${index + 1}. ${value.name === undefined ? '' : value.name}`} />
       </ListItem>
        ))}
      </List>
      </Box>
      <Button variant="contained" sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}} onClick={() => setShow(true)}>Start Game</Button>
        {/* <Button variant="contained" sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}}>Start Game</Button> */}
    </Box>
  )
}

}