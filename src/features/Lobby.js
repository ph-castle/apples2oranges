import React, { useState, useEffect } from 'react';
import { Box, Input, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { lobbyClient } from './utils/lobbyClient';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, StyledButton } from '../styles/globalStyles';
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
import { ButtonGroup } from 'reactstrap';

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
      <Box
        sx={{
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Heading>Join a Game</Heading>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography variant="body2">
            Enter the session code for the game you want to join
          </Typography>
          <Input
            sx={{
              color: 'white',
              outline: '1px solid white',
              padding: '0 0.5rem',
            }}
            placeholder="Session Code"
            value={sessionCode}
            onChange={(e) => {
              setSessionCode(e.target.value);
            }}
          />
        </Box>
        <StyledInnerBox>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Typography variant="body2">
              Enter the player name you'll use for this game
            </Typography>
            <Input
              sx={{
                color: 'white',
                outline: '1px solid white',
                padding: '0 0.5rem',
                marginRight: '1rem',
              }}
              placeholder="Nick Name"
              value={name}
              onChange={(e) => {
                console.log(e.target.value);
                setName(e.target.value);
              }}
            />
          </Box>
          <StyledButton
            variant="contained"
            onClick={() => joinMatchHandler(sessionCode)}
          >
            Join
          </StyledButton>
        </StyledInnerBox>
      </Box>
      <Box sx={{ width: '100%', height: '100%', zIndex: 1 }}>
        <Heading variant="h5" sx={{ mt: '1em', color: 'white' }}>
          Join a public game
        </Heading>
        <Box
          sx={{
            p: 2,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: '2em',
            mt: '1em',
            justifyItems: 'center',
            overflowY: 'scroll',
          }}
          style={{ marginTop: '1em' }}
        >
          {playerMatch.length === 0 ? (
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              No games available...
            </Typography>
          ) : (
            playerMatch.map((match, i) => (
              <Item
                sx={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '20rem',
                  maxHeight: '10rem',
                  paddingBottom: '1rem',
                  fontSize: '1rem',
                  position: 'relative',
                }}
                key={match.matchID}
                elevation={8}
              >
                Room- ({match.matchID})
                <Button
                  sx={{
                    position: 'absolute',
                    left: {
                      sm: '65%',
                    },
                    top: '65%',
                    color: 'white',
                    outline: '1px solid white',
                    fontSize: { sm: '0.5rem', md: '1rem' },
                    padding: '0.5rem',
                    backgroundColor: 'red',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                      boxShadow: '0px 0px 10px 10px orange',
                    },
                  }}
                  onClick={(e) => joinMatchHandler(match.matchID)}
                >
                  Join
                </Button>
              </Item>
            ))
          )}
        </Box>
      </Box>
    </StyledComponentContainer>
  );
};
export default Lobby;
