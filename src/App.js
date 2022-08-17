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
import ApplesClient from "./ApplesClient";
import { theme } from "./UI/theme";
import { ThemeProvider } from "@mui/material/styles";
import Hero from "./UI/Hero";

function App() {
  // let { matchId } = useParams()
  // let matchID = "0";
  const matchID = useSelector((state) => state.main.userMatchID);
  const playerID = useSelector((state) => state.main.userPlayerID);
  // generate random matchId (or use create API for authenticated matches)

  // let applesClients = [
  //   <ApplesClient matchID={matchID} playerID="0" />,
  //   <ApplesClient matchID={matchID} playerID="1" />,
  //   <ApplesClient matchID={matchID} playerID="2" />,
  // ];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header />
        <Hero theme={theme} />
        <Container
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            overflow: "hidden",
          }}
        >
          <Routes>
            {/* <Route path="/profile/:username" element={<EditProfile/>}/> */}
            <Route path="/" element={<Dashboard theme={theme} />} />
            <Route path="/home" element={<Dashboard theme={theme} />} />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
            <Route
              path="/game/apples/:matchId"
              element={<ApplesClient playerID={playerID} matchID={matchID} />}
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

// pages: edit profile, create custom cards, logout
