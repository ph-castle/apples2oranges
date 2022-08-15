import * as React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { Container } from "@mui/material";
import { Header } from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Game from "./Game";
import Lobby from "./features/Lobby";
import { StyledEngineProvider } from "@mui/material/styles";
import { LobbyTest } from './lobbyTest';

function App() {
  let { matchId } = useParams
  return (
    <StyledEngineProvider injectFirst>
      <Header/>
      <div>
          <Container maxWidth="lg">
            <Routes>
                {/* <Route path="/createuser" element={<CreateUser/>}/> */}
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/creategame" element={<CreateGame/>}/>
                <Route  path="/joingame" element={<Lobby/>}/>
                <Route path="/lobby" element={<LobbyTest/>}/>
                <Route  path="/game/:matchId" element={<Game/>}/>
            </Routes>
          </Container>
      </div>
    </StyledEngineProvider>
  );
}


export default App;


// pages: edit profile, create custom cards, logout

