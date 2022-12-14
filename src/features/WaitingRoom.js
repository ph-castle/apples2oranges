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
  const [currPlayers, setCurrPlayers] = useState([]);
  const [show, setShow] = useState(false);
  const playerID = localStorage.getItem('id');
  const playerCredentials = localStorage.getItem('credentials');

  useEffect(() => {
    const interval = setInterval(() => {
      lobbyClient.getMatch('Apples2Oranges', matchID).then(({ players }) => {
        setPlayers(players);
        const currentPlayers = players.filter((player) => player.name);
        setCurrPlayers(currentPlayers);
        if (currentPlayers.length === players.length) {
          setShow(true); //everyone has joined, show them the board
        }
      });
    }, 500);
    if (show) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [show, players.length, matchID]);

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
    return navigate(`/game/apples/${localStorage.getItem('matchID')}`);
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
