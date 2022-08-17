import * as React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Apples } from "./game/Apples";
import { ApplesBoard } from "./game/ApplesBoard";
import { Routes, Route, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

function App() {
  // let { matchId } = useParams()
  // let matchID = "0";
  const matchID = useSelector((state) => state.main.userMatchID);
  const playerID = useSelector((state) => state.main.userPlayerID);
  // generate random matchId (or use create API for authenticated matches)

  const ApplesClient = Client({
    game: Apples,
    board: ApplesBoard,
    numPlayers: 3,
    debug: true,
    // multiplayer: Local(),
    playerID: playerID,
    matchID: matchID,
    multiplayer: SocketIO({ server: "localhost:8000" }),
  });

  let applesClients = [
    <ApplesClient matchID={matchID} playerID="0" />,
    <ApplesClient matchID={matchID} playerID="1" />,
    <ApplesClient matchID={matchID} playerID="2" />,
  ];

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
            <Route path="/waitingroom/:matchID" element={<WaitingRoom />} />
            <Route path="/game/apples/:matchId" element={<ApplesClient />} />
          </Routes>
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

// pages: edit profile, create custom cards, logout
