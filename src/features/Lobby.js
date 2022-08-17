import React, { useState, useEffect } from "react";
import { Button, Box, Input, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { lobbyClient } from "./utils/lobbyClient";
// import { useDispatch, useSelector } from "react-redux";
// import { setMatchID, setPlayerID, setPlayerCredentials } from "../app/mainSlice";
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: "10rem",
  width: "100%",
  maxWidth: "16rems",
  lineHeight: "10rem",
}));

//Need to get current playerId
const Lobby = () => {
  let navigate = useNavigate();

  const [playerMatch, setPlayerMatch] = useState([]);
  // const [playerAccessKey, setPlayerAccessKey] = useState({});
  // const [gameMatchID, setGameMatchID] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [name, setName] = useState('');

  useEffect(() => {
    getAllAvailableGames().then(({ matches }) => {
      console.log(matches);
      setPlayerMatch(matches);
    });
  }, []);

  const getAllAvailableGames = () => {
    return lobbyClient
      .listMatches("Apples2Oranges")
      .catch((err) => console.log(err));
  };

  // const getMatchHandler = (matchID) => {
  //   return lobbyClient.getMatch("Apples2Oranges", matchID).catch((err) => {
  //     //TODO: if invalid matchId, then show validation err on the page
  //     console.log(err);
  //   });
  // };

  const joinMatchHandler = (matchID) => {
    lobbyClient
      .joinMatch("Apples2Oranges", matchID, {
       // playerID: "0",
        playerName: name,
        //data: "optional player meta data",
      })
      .then((player) => {
        console.log("player cred in Lobby", player);
        localStorage.setItem("matchID", matchID);
        localStorage.setItem("name", name);
        localStorage.setItem("id", player.playerID);
        localStorage.setItem("credentials", player.playerCredentials);
        // dispatch(setPlayerID(player.playerID));
        // dispatch(setPlayerCredentials(player.playerCredentials));
      })
      .then(() => {
        navigate(`/waitingroom/${matchID}`);
      })
      .catch(err => console.log("error in lobby join match handler", err))
  };

  // const updatePlayerHandler = () => {
  //   lobbyClient.updatePlayer('Apples2Oranges', gameMatchID, {
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
        <Typography variant="h5" sx={{ mt: "1em" }}>
          Enter the session code for the game you want to join
        </Typography>
          <Input
            placeholder="Session Code"
            value={sessionCode}
            onChange={(e) => {
              console.log(e.target.value);
              setSessionCode(e.target.value);
            }}
          />
          {/* <Button
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
          </Button> */}
        </Box>
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
        <Typography variant="h5" sx={{ mt: "1em" }}>
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
            disabled={""}
            onClick={() =>
              // getMatchHandler(sessionCode).then((match) => {
                //TODO: reroute here to loading deck
                joinMatchHandler(sessionCode)
              // }}
            }
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
          {playerMatch.map((match) => (
            <><Item
              key={match.matchID}
              elevation={8}
            >
              {match.matchID}
            </Item>
            <Button  onClick={() => {
              //TODO: reroute here to loading deck
              joinMatchHandler(match.matchID);
            }}>Join</Button>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Lobby;
