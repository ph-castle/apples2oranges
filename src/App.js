import * as React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { Container } from "@mui/material";
import { Header } from "./features/nav/Header";
import { Dashboard } from "./features/nav/Dashboard";
//import { Lobby } from "./lobbyTest";
import { CreateGame } from "./features/CreateGame";
import Game from "./Game";
import { JoinGame } from "./features/nav/JoinGame";
import { StyledEngineProvider } from "@mui/material/styles";
import { Client } from 'boardgame.io/react';
import { LobbyTest } from './lobbyTest';

function App() {
  let { matchId } = useParams
  return (
    <StyledEngineProvider injectFirst>
      <Header/>
      <div>
          <Container maxWidth="lg">
            <Routes>
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/creategame" element={<CreateGame/>}/>
                <Route  path="/joingame" element={<JoinGame/>}/>
                <Route path="/lobby" element={<LobbyTest/>}/>
                <Route  path="/game/:matchId" element={<Game/>}/>
            </Routes>
          </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

