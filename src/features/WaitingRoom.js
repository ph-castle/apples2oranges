

  // navigate here either from lobby if matchID => !startGame, from createGame(playerID = 0), or using URL
   // if a new client (session id?) navigates to the url, prompt them to join the game (enter a playerName)
        // should also have a default playor name for people and then prompt them to change it or show them to change it

  // update playerNames who are in the waiting room

  // need to create clients before starting game
    // when start game, set start to true
      // conditionally render the AppleClient instead of the waiting room
      // update the URL either by window.location or can add Route to apple

  // function joinGame(matchID, name) {
  // return getPlayer(matchID, name)
  //   .then(player => {
  //     console.log(`credentials and id returned for player ${name}`, player);
  //     dispatch(setPlayerID(player.playerID));
  //     dispatch(setPlayerCredentials(player.playerCredentials));
  //   })
  //   .catch((err) => {
  //   console.log("catch all error in getPlayer from join gameclickHandler", err);
  //   });
  // }





//   function joinMatchHandler(e, pName) {
//     lobbyClient
//     .joinMatch('Apples2Oranges', matchID, { playerName: pName })
//     .then(player => {
//       console.log(`credentials and id returned for joined player`, player);
//       dispatch(setPlayerID(player.playerID));
//       dispatch(setPlayerCredentials(player.playerCredentials));
//     })
//     .catch((err) => {
//     console.log("catch all errors in joinMatchHandler in WaitingRoom", err);
//     });
//     // should re-render and now conditionally show waiting room with other players
//   }



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
import { useParams, useNavigate } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from '../game/Apples';
import { ApplesBoard } from '../game/ApplesBoard';
import { lobbyClient } from './utils/lobbyClient'
import { useSelector, useDispatch } from "react-redux";
import { setMatchID, setPlayerID, setPlayerCredentials, setRoom } from "../app/mainSlice";


export const WaitingRoom = () => {
  const playerID = useSelector((state) => state.playerID);
  const playerCredentials = useSelector((state) => state.playerCredentials);
  const { matchID } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();





useEffect(() => {
  const interval = setInterval(() => {
    lobbyClient.getMatch('Apples2Oranges', matchID)
      .then(({players}) => {
        console.log(players);
        setPlayers(players);
        localStorage.setItem("players", players);
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

}, [show, players, matchID]);

function handleStartGame() {
  console.log('handle click running')
  setShow(true);
  //{navigate(`/game/apples/${localStorage.getItem('matchID')}`)};
  dispatch(setRoom("game"));
  localStorage.setItem('room', 'game');
};


const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  numPlayers: 3,
  debug: true,
  playerID: playerID,
  matchID: matchID,
  playerCredentials: playerCredentials,
});


console.log(localStorage.getItem("id")); //0 host


  return(
    <>
    {show
    ? (
    <ApplesClient
      playerID={localStorage.getItem("id")}
      matchID={matchID}
      credentials={localStorage.getItem("credentials")}
    />
  ) :
  (<Box
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
      {players.length >= 3
      ? <Button variant="contained" sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}} onClick={() => setShow(true)}>Start Game</Button>
      : <Button variant="contained" disabled sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}}>Start Game</Button>}
    </Box>
  )}
</>
)
}

