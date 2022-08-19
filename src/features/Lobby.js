import React, { useState, useEffect } from 'react';
import { Button, Box, Input, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { lobbyClient } from './utils/lobbyClient';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   setMatchID,
//   setPlayerID,
//   setPlayerCredentials,
// } from "../app/mainSlice";
import { useNavigate } from 'react-router-dom';
import {
  StyledComponentContainer,
  StyledInnerBox,
} from '../styles/globalStyles';

const Item = styled(Paper)(() => ({
  textAlign: 'center',
  height: '10rem',
  width: '100%',
  maxWidth: '16rems',
  lineHeight: '10rem',
  outline: 'white solid 1px',
  backgroundColor: 'black',
  color: 'white',
  fontSize: '2rem',
}));

const Lobby = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [playerMatch, setPlayerMatch] = useState([]);
  const [playerAccessKey, setPlayerAccessKey] = useState({});
  const [gameMatchID, setGameMatchID] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getAllAvailableGames().then(({ matches }) => {
      console.log(matches);
      setPlayerMatch(matches);
    });
  }, []);

  const getAllAvailableGames = () => {
    return lobbyClient
      .listMatches('Apples2Oranges')
      .catch((err) => console.log(err));
  };

  const joinMatchHandler = (matchID) => {
    if (name === '') {
      alert('please select a name');
    } else {
      lobbyClient
        .joinMatch('Apples2Oranges', matchID, {
          // playerID: "0",
          playerName: name,
          //data: "optional player meta data",
        })
        .then((player) => {
          console.log('player cred in Lobby', player);
          localStorage.setItem('matchID', matchID);
          localStorage.setItem('name', name);
          localStorage.setItem('id', player.playerID);
          localStorage.setItem('credentials', player.playerCredentials);
          // dispatch(setPlayerID(player.playerID));
          // dispatch(setPlayerCredentials(player.playerCredentials));
        })
        .then(() => {
          navigate(`/waitingroom/${matchID}`);
        })
        .catch((err) => console.log('error in lobby join match handler', err));
    }
  };

  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   alignItems="flex-start"
    //   minHeight="100vh"
    //   width="100%"
    // ></Box>
    <StyledComponentContainer>
      <Box>
        <Typography variant="h3" sx={{ mt: '1em' }}>
          Join a Game
        </Typography>
        <Box>
          <Typography variant="h5" sx={{ mt: '1em' }}>
            Enter the session code for the game you want to join
          </Typography>
          <Input
            placeholder="Session Code"
            value={sessionCode}
            onChange={(e) => {
              setSessionCode(e.target.value);
            }}
          />
        </Box>
        <StyledInnerBox>
          <Typography variant="h5" sx={{ mt: '1em' }}>
            Enter the player name you'll use for this game
          </Typography>
          <Input
            placeholder="Nick Name"
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => joinMatchHandler(sessionCode)}
          >
            Join
          </Button>
        </StyledInnerBox>
      </Box>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h5" sx={{ mt: '1em' }}>
          Join a public game
        </Typography>
        <Box
          sx={{
            p: 2,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: '2em',
            mt: '1em',
            justifyItems: 'center',
            overflowY: 'scroll',
          }}
          style={{ marginTop: '1em' }}
        >
          {playerMatch.map((match) => (
            <div style={{ width: '100%', height: '100%' }}>
              <Item
                sx={{ width: '100%', height: '100%' }}
                key={match.matchID}
                elevation={8}
              >
                {match.matchID}
              </Item>
              <Button
                sx={{
                  left: { sm: '60%', md: '70%' },
                  top: '-20%',
                  color: 'white',
                }}
                onClick={(e) => joinMatchHandler(match.matchID)}
              >
                Join Game
              </Button>
            </div>
          ))}
        </Box>
      </Box>
    </StyledComponentContainer>
  );
};
export default Lobby;
