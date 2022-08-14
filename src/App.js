import * as React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { Container } from "@mui/material";
import { Header } from "./features/nav/Header";
import { Dashboard } from "./features/nav/Dashboard";
import { Lobby } from "./features/nav/Lobby";
import { CreateGame } from "./features/CreateGame";
import { StyledEngineProvider } from "@mui/material/styles";
import { Client } from 'boardgame.io/react';

function App() {
  let { matchId } = useParams
  return (
    <StyledEngineProvider injectFirst>
      <Header/>
      <div>
          <Container maxWidth="lg">
            <Routes>
              {/* <Route path="/" element={<Header/>}> */}
                <Route path="home" element={<Dashboard/>}/>
              {/* <Route>
                <CreateGame path='creategame' />
              </Route> */}
              {/* <Route>
                <JoinGame path='/joingame' />
              </Route> */}
                <Route path="lobby" element={<Lobby/>}/>
                {/* <Lobby path='/lobby' />
              </Route> */}
              {/* <Route>
                <Game path='/game/:matchId' />
              </Route> */}
              {/* </Route> */}
            </Routes>
          </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

