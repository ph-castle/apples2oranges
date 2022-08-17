import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { ApplesClient } from "./features/utils/ApplesClient";
import { theme } from "./UI/theme";
import { ThemeProvider } from "@mui/material/styles";
import Hero from "./UI/Hero";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header />
        {/* <Hero theme={theme} /> */}
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/waitingroom/:matchID" element={<WaitingRoom />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
            <Route
              path="/game/apples/:matchID"
              element={
                <ApplesClient
                  matchID={localStorage.getItem("matchID")}
                  numPlayers={localStorage.getItem("players")}
                  playerID={localStorage.getItem("id")}
                  credentials={localStorage.getItem("credentials")}
                />
              }
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
