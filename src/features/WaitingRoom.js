import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { lobbyClient } from "./utils/lobbyClient";
import { Box, Typography, Button, List, ListItem, ListItemText, createTheme, ThemeProvider, Input, Paper } from "@mui/material";
import { useSelector,  useDispatch  } from "react-redux";
import { setMatchID, setPlayerID, setPlayerCredentials } from "../app/mainSlice";
import { Client } from 'boardgame.io/react';
import { Apples } from '../game/Apples';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { ApplesBoard } from '../game/ApplesBoard';
import { useNavigate } from "react-router-dom";

export const WaitingRoom = () => {
  let dispatch = useDispatch();
  const [startGame, setStartGame] = useState(false);
  const [minPlayers, setMinPlayers] = useState(false);
  let [players, setPlayers] = useState([]);
  const [show, setShow] = useState(false);
//  let match;
  let timeout;
  let { matchID } = useParams();
  setMatchID(matchID);
  //const matchIDState = useSelector((state) => state.matchID);
  const [pName, setPName] = useState('');
  let navigate = useNavigate();
  let playerID = useSelector((state) => state.playerID);


  console.log(playerID);
//   console.log("matchID from waiting froom", matchID);
//   // navigate here either from lobby if matchID => !startGame, from createGame(playerID = 0), or using URL
//    // if a new client (session id?) navigates to the url, prompt them to join the game (enter a playerName)

//   // update playerNames who are in the waiting room

//   // need to create clients before starting game
//     // when start game, set start to true
//       // conditionally render the AppleClient instead of the waiting room
//       // update the URL either by window.location or can add Route to apple

//   // function joinGame(matchID, name) {
//   // return getPlayer(matchID, name)
//   //   .then(player => {
//   //     console.log(`credentials and id returned for player ${name}`, player);
//   //     dispatch(setPlayerID(player.playerID));
//   //     dispatch(setPlayerCredentials(player.playerCredentials));
//   //   })
//   //   .catch((err) => {
//   //   console.log("catch all error in getPlayer from join gameclickHandler", err);
//   //   });
//   // }


//   // const getPlayer = async(matchID, name) => {
//   //   try {
//   //     let player = await lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: name});
//   //     return player;
//   //   } catch(err) {
//   //     console.log("error getting playe async function", err);
//   //   }
//   //   return null;
//   // }


//   // const makeGame = async(matchID) => {
//   //   if (matchID.length > 0) {
//   //     try {
//   //       const host = await joinGame(matchID, "host");
//   //     } catch(err) {
//   //       console.log("eror makeing host", err);
//   //     }
//   //     try {
//   //       const player1 = await joinGame(matchID, "player1");
//   //     } catch(err) {
//   //       console.log("eror makeing player1", err);
//   //     }
//   //     try {
//   //       const player2 = await joinGame(matchID, "player2");
//   //     } catch(err) {
//   //       console.log("eror makeing player2", err);
//   //     }
//   //   }
//   //   return;
//   // };

//   // if (matchID.length > 0) {
//   //   makeGame(matchID);
//   // } else {
//   //   console.log("matchID not long enough");
//   // }


//const AppT = Client({game: 'Apples2Oranges'});


const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  numPlayers: 3,
  debug: false,
  //playerID: 0,
  matchID: 'tM8w-LBi-bR',
  playerCredentials: ''
});

// update(state) {
//   if (state === null) return;
//   // ...
// };



const AppT = () => (
  <div>
    <ApplesClient playerID={playerID} />
    {/* <ApplesClient playerID="1" />
    <ApplesClient playerID="2" /> */}
  </div>
);


// useEffect(() => {
//   const interval = setInterval(() => {
//     lobbyClient.getMatch('Apples2Oranges', matchID)
//       .then(({players}) => {
//         console.log(players);
//         setPlayers(players);
//         const currPlayers = players.filter((player) => player.name);
//         if (currPlayers.length === players.length) {
//           setShow(true); //everyone has joined, show them the board
//         }
//       })
//   }, 500);
//   if(show) {
//     clearInterval(interval);
//   }
//   return () => {
//     clearInterval(interval);
//   };

// }, [show, players.length, matchID]);

//   // matchID &&
//   // const updatePlayers = async(matchID) => {
//   //   try {
//   //     match = await lobbyClient.getMatch('Apples2Oranges', matchID);
//   //     console.log(match);
//   //     setPlayers(match.players)
//   //   } catch(err) {
//   //     console.log("error getting match in WaitingRoom", err);
//   //   }
//   //   if (!startGame) {
//   //   } else {
//   //     try {
//   //       timeout = await setTimeout(updatePlayers, 20000);
//   //     } catch(err) {
//   //       console.log("error using setTimeout in WaitingRoom update players function", err);
//   //     }
//   //   } // else could make clients here
//   // };


//   console.log("matchID", matchID); //tM8w-LBi-bR

//   // useEffect((matchID) => {
//   //   updatePlayers(matchID)
//   //   // make a client for each player
//   // }, [matchID]);



//   function handleClickStartGame() {
//     // these two things are kind of redundant
//      setStartGame(true);
//      clearTimeout(timeout);
//      // display some message saying others can join later using code, if forget code in url (should also display on game page)
//      // could make clients here
//      // redirect to
//   }

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


  function addHost() {
    lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: "host"})
    .then(player => {
      console.log(`credentials and id returned for player host`, player);
      dispatch(setPlayerID(player.playerID));
      dispatch(setPlayerCredentials(player.playerCredentials));
    })
    .catch((err) => {
    console.log("catch all error in gehost from join gameclickHandler", err);
    });
  }

  function addPlayer1() {
    lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: "player1"})
    .then(player => {
      console.log(`credentials and id returned for player1`, player);
      dispatch(setPlayerID(player.playerID));
      dispatch(setPlayerCredentials(player.playerCredentials));
    })
    .catch((err) => {
    console.log("catch all error in getPlayer1 from join gameclickHandler", err);
    });
  }

  function addPlayer2() {
    lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: "player2"})
    .then(player => {
      console.log(`credentials and id returned for player2`, player);
      dispatch(setPlayerID(player.playerID));
      dispatch(setPlayerCredentials(player.playerCredentials));
    })
    .catch((err) => {
    console.log("catch all error in getPlayer2 from join gameclickHandler", err);
    });
  }

  return(
    <>
    {/* {matchID !== matchIDState
    ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            minHeight="100vh"
            width="100%"
          >
            <Box>
              <Typography variant="h3" sx={{ mt: "1em" }}>
              {`Would you like to join game ${matchID}`}
              </Typography>
              <Typography variant="h5" sx={{ mt: "1em" }}>
               Enter player name
              </Typography>
              <Box
                gap={1}
                sx={{
                  mt: "2em",
                  mb: "3em",
                  ml: "0.75rem",
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Input
                  placeholder="player name"
                  value={pName}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setPName(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  disabled={!pName.length}
                  onClick={(e) => {
                    joinMatchHandler(pName, e);
                  }}
                >
                Join
                </Button>
              </Box>
            </Box>
          </Box> */}
        ) : (
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
            <Button variant="contained" sx={{p:'0.5rem', mt: '1rem', fontSize: {sm: '1rem',md:'1.2rem'}}}>Your Session Code: {matchID}</Button>
            <Box>
              <List sx={{ width: '100%', maxHeight: 400, bgcolor: 'color', p: '1rem', overflowY:'scroll' }}>
              {players.map((value, index) => (
                <ListItem
                  key={value}
                  disableGutters
                >
               <ListItemText primaryTypographyProps={{fontSize: {sm: '18px', md: '20px'}}} primary={`${index + 1}. ${value.name === undefined ? '' : value.name}`} />
              </ListItem>
              ))}
              </List>
            </Box>
            {players.length >= 3
            ? <Button
                variant="contained"
                type="button"
                sx={{p:'0.5rem', width: '50%', ml: '1rem', fontSize: {sm: '1rem', md: '1.wrem'}}}
              >
              Start Game
              </Button>
            : <Button
                variant="contained"
                type="button"
                disabled
                sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}}
              >
              Start Game
              </Button>
            }
      <Button onClick={addHost}>
      Addd Host
      </Button>
       <Button onClick={addPlayer1}>
        Addd Player 1
       </Button>
       <Button onClick={addPlayer2}>
       Addd Player 2
       </Button>
       {/* <ApplesClient name={player2} playerID={playerID} /> */}
       <div>
        <ApplesClient playerID="0" />
        <ApplesClient playerID="1" />
        <ApplesClient playerID="2" />
      </div>
    </Box>
  )}
  </>
)}

// import React, {useState, useEffect} from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   createTheme,
//   ThemeProvider } from "@mui/material";
// import { useParams } from 'react-router-dom';
// import { Client } from 'boardgame.io/react';
// import { SocketIO } from 'boardgame.io/multiplayer';
// import { Apples } from '../game/Apples';
// import { ApplesBoard } from '../game/ApplesBoard';
// import { lobbyClient } from './utils/lobbyClient'
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // const ApplesClient = Client({
// //   game: Apples,
// //   board: ApplesBoard,
// //   debug: true,
// //   multiplayer: SocketIO({server: 'localhost:8000'})
// //   });

// export const WaitingRoom = () => {
//   const playerID = useSelector((state) => state.playerID);
//   const playerCredentials = useSelector((state) => state.playerCredentials);
//   //const matchID = useSelector((state) => state.matchID);
//   const navigate = useNavigate();

//   const { matchID } = useParams();
//   const [players, setPlayers] = useState([]);
//   const [copied, setCopied] = useState(false);
//   const [show, setShow] = useState(false);


// useEffect(() => {
//   const interval = setInterval(() => {
//     lobbyClient.getMatch('Apples2Oranges', matchID)
//       .then(({players}) => {
//         console.log(players);
//         setPlayers(players);
//         const currPlayers = players.filter((player) => player.name);
//         if (currPlayers.length === players.length) {
//           setShow(true); //everyone has joined, show them the board
//         }
//       })
//   }, 500);
//   if(show) {
//     clearInterval(interval);
//   }
//   return () => {
//     clearInterval(interval);
//   };

// }, [show, players.length, matchID]);

// function handleStartGame() {
//   console.log('handle click running')
//   setShow(true);
//  // return ApplesClient.start();
// };



//   //navigate(`/game/apples/${matchID}`)

//   ApplesClient.start();



// // const leaveRoom = () => {

// // }

// //const Test = Client({game: 'Apples2Oranges'});





// // return(
// //   <ApplesClient />
// // )

// // update(state) {
// //   if (state === null) return;
// //   // ...
// // };

// // // const App = () => (
// // //   <div>
// // //     <
// // //     <ApplesClient playerID="1" />
// // //     <ApplesClient playerID="2" />
// // //   </div>
// // // );


// if(show) {
//   return (
//     <ApplesClient  playerID={playerID} matchID={matchID} credentials={playerCredentials}/>
//   )
//   //   <ApplesClient
//   //     matchID={matchID}
//   //     playerID={playerID}
//   //     credentials={playerCredentials}
//   //   />
//   // )
// } else {
//   return (
//     <Box
//       sx={{
//         display:"flex",
//         maxWidth: 500,
//         height: "80vh",
//         flexDirection:"column",
//         p:'1rem',
//         ml: {md: '2rem'},
//         mt: '0.5rem'
//       }}
//     >
//       <Typography variant="h4" sx={{fontSize: {xs:'1.7rem', sm: '2rem', md:'2.2rem'}, mt: '0.6rem'}}>Waiting for players</Typography>
//       <Box sx={{textAlign: 'center', background: 'blue', p:'0.5rem', mt: '1rem', fontSize: {sm: '1rem',md:'1.2rem'}}}>{matchID}</Box>
//       <Box>
//       <List sx={{ width: '100%', maxHeight: 400, bgcolor: 'color', p: '1rem', overflowY:'scroll' }}>
//         {players.map((value, index) => (
//         <ListItem
//           key={value + index}
//           disableGutters
//         >
//       <ListItemText primaryTypographyProps={{fontSize: {sm: '18px', md: '20px'}}} primary={`${index + 1}. ${value.name === undefined ? '' : value.name}`} />
//        </ListItem>
//         ))}
//       </List>
//       </Box>
//       <Button variant="contained" sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}} onClick={() => handleStartGame()}>Start Game</Button>
//         {/* <Button variant="contained" sx={{p:'0.5rem', width: '50%', ml: '1rem',fontSize: {sm: '1rem', md: '1.wrem'}}}>Start Game</Button> */}
//     </Box>
//   )
// }
// }

// function ApplesClient() {

// }

// const ApplesClient = new Client({
//   game: Apples,
//   board: ApplesBoard,
//   multiplayer: SocketIO({ server: 'localhost:8000' }),
//   numPlayers: players.length,
//   debug: true,
//   playerID: playerID,
//   matchID: matchID,
//   playerCredentials: playerCredentials
// });
// ApplesClient.start();
