import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { lobbyClient } from './utils/lobbyClient';

export const WaitingRoom = () => {
  const navigate = useNavigate();
  const { matchID } = useParams();
  const [players, setPlayers] = useState([]);
  //const [currPlayers, setCurrPlayers] = useState([]);
  const [show, setShow] = useState(false);
  const playerID = localStorage.getItem('id');
  const playerCredentials = localStorage.getItem('credentials');

  // useEffect(() => {
  //   // might want this outside of useEffect too
  //   if (show) {
  //     clearInterval(interval);
  //   }
  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // }, [show, interval]);  // no dot length?
  // }, [show, players.length, matchID]);  // no dot length?

  // const getJoinedPlayers = async () => {
  //   try {
  //     let { players } = await lobbyClient.getMatch('Apples2Oranges', matchID);
  //     console.log('players: ', players);
  //     return players;
  //   } catch (err) {
  //     console.log('error getting players', err);
  //   }
  // };

  // await setPlayers(() => players);
  // console.log('players: ', players);
  // let joinedPlayers = players.map(player => player.name);
  // if (joinedPlayers.length === players.length) {
  //   await setShow(() => true);
  // }
  // const interval = setInterval(() => {
  //   getPlayers();
  // }, 500);

  // const getPlayers = () => {
  //   lobbyClient.getMatch('Apples2Oranges', matchID)
  //   .then(({ players }) => {
  //     console.log('players: ', players);
  //     setPlayers(players);
  //     const currentPlayers = players.filter((player) => player.name);
  //     setCurrPlayers(() => currentPlayers);
  //     if (currentPlayers.length === players.length) {
  //       setShow(() => true); //everyone has joined, show them the board
  //     }
  //   })
  //   .catch(err => console.log('error getting players: ', err));
  // };
  // }, 500);
  // if (show) {
  //   clearInterval(interval);
  // }

  // const interval = setInterval(() => {
  //   lobbyClient.getMatch('Apples2Oranges', matchID)
  //   .then(({ players }) => {
  //     setPlayers(players);
  //     const currentPlayers = players.filter((player) => player.name);
  //     setCurrPlayers(() => currentPlayers);
  //     if (currentPlayers.length === players.length) {
  //       setShow(() => true); //everyone has joined, show them the board
  //     }
  //   });
  // }, 500);
  // if (show) {
  //   clearInterval(interval);
  // }
  useEffect(() => {
    // might want this outside of useEffect too
    const intervalId = setInterval(() => {
      lobbyClient.getMatch('Apples2Oranges', matchID)
      .then(({ players }) => {
        console.log('players: ', players);
        setPlayers(players);
        const currentPlayers = players.filter((player) => player.name);
        //setCurrPlayers(() => currentPlayers);
        if (currentPlayers.length === players.length) {
          setShow(() => true); //everyone has joined, show them the board
        }
      })
      .catch(err => console.log('error getting players: ', err));
    }, 500);
    if (show) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [show, matchID]);  // no dot length?

  const leaveRoom = () => {
    lobbyClient
      .leaveMatch('Apples2Oranges', matchID, {
        playerID: playerID,
        credentials: playerCredentials,
      })
      .then(() => {
        navigate(`/joingame`);
      })
      .catch((err) => console.error(err));
  };

  if (show && playerID) {
    return navigate(`/game/apples/${localStorage.getItem('matchID')}`); // can just use matchID, defined above
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          minWidth: 300,
          maxWidth: 500,
          maxHeight: '70vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: '1rem',
          ml: { md: '2rem' },
          mt: '0.5rem',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' },
            mt: '0.6rem',
          }}
        >
          Waiting for players
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            background: 'blue',
            p: '0.5rem',
            mt: '1rem',
            fontSize: { sm: '1rem', md: '1.2rem' },
            width: '100%'
          }}
        >
          {matchID}
        </Box>
        <Box sx={{width: '100%'}}>
          <List
            sx={{
              width: '100%',
              maxHeight: 400,
              bgcolor: 'color',
              p: '1rem',
              overflowY: 'scroll',
            }}
          >
            {players.map((value, index) => (
              <ListItem key={value + index} disableGutters>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: { sm: '18px', md: '20px' },
                  }}
                  primary={`${index + 1}. ${
                    value.name === undefined ? '' : value.name
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: 'flex',
            maxWidth: 500,
            p: '1rem',
            ml: { md: '2rem' },
            mt: '0.5rem',
          }}
        >
          <Button
            variant="contained"
            sx={{
              p: '0.5rem',
              width: '100%',
              ml: '1rem',
              fontSize: { sm: '1rem', md: '1.wrem' },
              outline: '1px solid white',
            }}
            onClick={() => leaveRoom()}
          >
            Leave Game
          </Button>
        </Box>
      </Box>
    );
  }
};
