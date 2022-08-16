import * as React from "react";

import { Routes, Route, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ApplesClient from "./ApplesClient";
import axios from "axios";

function App() {
  // let { matchId } = useParams()
  // let matchID = "0";
  const matchID = useSelector((state) => state.main.userMatchID);
  const playerID = useSelector((state) => state.main.userPlayerID);
  const [decks, setDecks] = React.useState([]);
  // generate random matchId (or use create API for authenticated matches)
  React.useEffect(() => {
    axios.get("/cards/prompt").then((res) => {
      console.log(res.data);
      setDecks(res.data);
    });
  }, []);

  // let applesClients = [
  //   <ApplesClient matchID={matchID} playerID="0" />,
  //   <ApplesClient matchID={matchID} playerID="1" />,
  //   <ApplesClient matchID={matchID} playerID="2" />,
  // ];

  return (
    <StyledEngineProvider injectFirst>
      <Header />
      <div>
        <Container maxWidth="lg">
          <Routes>
            {/* <Route path="/profile/:username" element={<EditProfile/>}/> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
            {decks.length > 0 && (
              <Route
                path="/game/apples/:matchId"
                element={
                  <ApplesClient
                    decks={decks}
                    matchID={matchID}
                    playerID={playerID}
                  />
                }
              />
            )}
          </Routes>
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

// pages: edit profile, create custom cards, logout
