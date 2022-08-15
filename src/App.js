import * as React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';
import { Container } from "@mui/material";

import { Header } from "./features/Header.js";
import { Lobby } from './features/Lobby'
import { Dashboard } from "./features/Dashboard";

import { CreateGame } from "./features/CreateGame";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";

const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  numPlayers: 3,
  debug: true,
  // multiplayer: Local(),
  multiplayer: SocketIO({server: 'localhost:8000'})
});

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Container maxWidth="lg">

            {/* <Dashboard /> */}
          <CreateGame/>
            <ApplesClient playerID="0" />
            <ApplesClient playerID="1" />
            <ApplesClient playerID="2" />
        </Container>
      </div>
    </StyledEngineProvider>
  );
}
