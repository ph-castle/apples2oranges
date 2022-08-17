import { React, useState, useEffect } from "react";
import { Client } from 'boardgame.io/react';
import { SocketIO, Local } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';
import { Routes, Route } from 'react-router-dom';
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
// import { lobbyClient } from "./features/utils/lobbyClient";
import { useSelector } from "react-redux";
import { ApplesClient } from './features/utils/ApplesClient';

function App() {


  // useEffect(() => {
  //   getMatchID()
  //   .then(matchID => {
  //     console.log(matchID)
  //     setMatchID(matchID)
  //   })
  //   .catch(err => console.log("error getting matchID", err))
  // }, [])


  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Container maxWidth="lg">
          <Routes>
            {/* <Route path="/profile/:username" element={<EditProfile/>}/> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/apples/:room/:matchID" element={<WaitingRoom />} />
            {/* <Route path="/appples/applesclient/:matchID" element={  <ApplesClient
                                                              matchID={localStorage.getItem("matchID")}
                                                              numPlayers={localStorage.getItem("players")}
                                                              playerID={localStorage.getItem("id")}
                                                              credentials={localStorage.getItem("credentials")}
                                                              />} /> */}
          </Routes>
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

// pages: edit profile, create custom cards, logout
