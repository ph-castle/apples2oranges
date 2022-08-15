import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';
import { Container } from "@mui/material";
import { Header } from "../src/features/nav/Header";
// import { Dashboard } from "./features/nav/Dashboard";
import { CreateGame } from "./features/CreateGame";
import { StyledEngineProvider } from "@mui/material/styles";

const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  numPlayers: 3,
  debug: true,
  // multiplayer: Local(),
  multiplayer: SocketIO({server: 'localhost:8000'})
});

// const App = () => (
//   <div
//     style={{ display: 'flex', justifyContent: 'space-around', gap: '1.25rem' }}
//   >

//   </div>
// );




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

