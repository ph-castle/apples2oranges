import React, { useState, useEffect } from "react";
import { Button, Box, Input, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// per lobby api docs (https://github.com/boardgameio/boardgame.io/blob/main/docs/documentation/api/Lobby.md)
// lobbyClient is an instance of LobbyClient imported below  -- this is different than what Kesang/Heemo
// which is why I left commented out
//import { LobbyClient } from 'boardgame.io/client';
import { lobbyClient } from "./utils/lobbyClient";
const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: "10rem",
  width: "100%",
  maxWidth: "16rems",
  lineHeight: "10rem",
}));


//Need to get current playerId
const Lobby = () => {
  const [playerMatch, setPlayerMatch] = useState({});
  const [playerAccessKey, setPlayerAccessKey] = useState({});
  const [gameMatchID, setGameMatchID] = useState("");
  const [sessionCode, setSessionCode] = useState("");

  //see note above re importing LobbyClient
  //const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' });

  useEffect(() => {
    getAllAvailableGames().then(({ matches }) => {
      console.log(matches);
      setPlayerMatch(matches);
    });
  }, []);

  const getAllAvailableGames = () => {
    return lobbyClient
      .listMatches("apples-to-oranges")
      .catch((err) => console.log(err));
  };

  const getMatchHandler = (matchID) => {
    return lobbyClient.getMatch("apples-to-oranges", matchID).catch((err) => {
      //TODO: if invalid matchId, then show validation err on the page
      console.log(err);
    });
  };

  const joinMatchHandler = (matchID) => {
    lobbyClient
      .joinMatch("apples-to-oranges", matchID, {
        playerID: "0",
        playerName: "Alice",
        data: "optional player meta data",
      })
      .then(({ playerCredentials }) => {
        console.log(playerCredentials);
        setPlayerAccessKey(playerCredentials);
      });

    setGameMatchID(matchID);
  };

  // const updatePlayerHandler = () => {
  //   lobbyClient.updatePlayer("apples-to-oranges", gameMatchID, {
  //     playerID: "0",
  //     credentials: playerAccessKey,
  //     newName: "Al",
  //   });
  // };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      minHeight="100vh"
      width="100%"
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
            ml: "0.75rem",
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Input
            placeholder="Session Code"
            value={sessionCode}
            onChange={(e) => {
              console.log(e.target.value);
              setSessionCode(e.target.value);
            }}
          />
          <Button
            variant="contained"
            disabled={!sessionCode.length}
            onClick={() => {
              getMatchHandler(sessionCode).then((match) => {
                //TODO: reroute here to loading deck
                joinMatchHandler(sessionCode);
              });
            }}
          >
            Join
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ mt: "1em" }}>
          Join a public game
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: "2em",
            mt: "1em",
            justifyItems: "center",
          }}
          style={{ marginTop: "1em" }}
        >
          {[0, 1, 2].map((elevation) => (
            <Item
              key={elevation}
              elevation={8}
              onClick={(e) => {
                //TODO: reroute here to loading deck
                joinMatchHandler(e.target.key);
              }}
            >
              Game
            </Item>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Lobby;
