
import { React, useState, useEffect } from "react";
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';
import { Routes, Route, useParams } from 'react-router-dom';
import { Container } from "@mui/material";
import { Header } from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { lobbyClient } from "./features/utils/lobbyClient";

function App() {
  const [setMatchId, matchId] = useState('');

  useEffect(() => {
    getMatchId()
    .then(nextMatchId => setMatchId(nextMatchId))
    .catch(err => console.log("error setting matchId state", err))
  }, [])

  let nextMatchId;

  const getMatchId = () => {
    return lobbyClient
      .listMatches('Apples2Oranges')
      .catch((err) => console.log(err))
        .then((matches) => {
          console.log(matches.length);
          nextMatchId = `${matches.length}`;
        })
        .catch((err) => console.log("error setting nextMatchId", err))
  }


  const ApplesClient = Client({
   game: Apples,
    board: ApplesBoard,
    numPlayers: 3,
    debug: true,
    // multiplayer: Local(),
    multiplayer: SocketIO({server: 'localhost:8000'})
  });

  let applesClients=[<ApplesClient playerID="0" />, <ApplesClient playerID="1" />,  <ApplesClient playerID="2" />];

  return (
    <StyledEngineProvider injectFirst>
      <Header/>
      <div>
          <Container maxWidth="lg">
            <Routes>
                {/* <Route path="/profile/:username" element={<EditProfile/>}/> */}
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/creategame" element={<CreateGame applesClients={applesClients}/>}/>
                <Route  path="/joingame" element={<Lobby/>}/>
                <Route path="/waitingroom" element={<WaitingRoom/>}/>
                <Route  path={`/game/apples/:${matchId}`} element={<Apples/>}/>
            </Routes>
          </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;


// pages: edit profile, create custom cards, logout

