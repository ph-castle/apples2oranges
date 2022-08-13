import React, { useState, useEffect } from "react";
import { Button, Box, Input, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { lobbyClient } from "./utils/lobbyClient";
const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: 200,
  width: 400,
  lineHeight: "200px",
}));

//Need to get current playerId
const Lobby = () => {
  const [playerMatch, setPlayerMatch] = useState({});
  const [playerAccessKey, setPlayerAccessKey] = useState({});
  const [gameMatchID, setGameMatchID] = useState("");
  const [sessionCode, setSessionCode] = useState("");

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

  const updatePlayerHandler = () => {
    lobbyClient.updatePlayer("apples-to-oranges", gameMatchID, {
      playerID: "0",
      credentials: playerAccessKey,
      newName: "Al",
    });
  };

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
                joinMatchHandler(sessionCode);
              });
            }}
          >
            Join
          </Button>
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
            gridTemplateColumns: {
              sm: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: "2em",
            mt: "1em",
          }}
          style={{ marginTop: "1em" }}
        >
          {[0, 1, 2].map((elevation) => (
            <Item
              key={elevation}
              elevation={8}
              matchId="matchID"
              onClick={() => {}}
            >
              Game
            </Item>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// import React from "react";
// import { Button, Box, Input, Paper, Typography } from "@mui/material";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// const Item = styled(Paper)(() => ({
//   textAlign: "center",
//   height: 200,
//   width: 400,
//   lineHeight: "200px",
// }));

// const Lobby = async () => {
//   // const [matches, setMatches] = useState({});

//   // useEffect(() => {
//   //   getAllAvailableGames().then(({ matches }) => {
//   //     console.log(matches);
//   //     setMatches(matches);
//   //   });
//   // }, []);

//   // const getAllAvailableGames = () => {
//   //   return lobbyClient
//   //     .listMatches("apples-to-oranges")
//   //     .catch((err) => console.log(err));
//   // };

//   // const getMatchHandler = (matchID) => {
//   //   return lobbyClient.getMatch("apples-to-oranges", matchID);
//   // };
//
//   );
// };

export default Lobby;
