import React, { useState } from "react";
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';
import { Routes, Route, useParams } from 'react-router-dom';
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import ProfilePage from './features/login/ProfilePage';
import EditProfile from './features/login/EditProfile';
import LoginPage from './features/login/LoginPage';
import CreateUserPage from './features/login/CreateUserPage';

export default function App() {
  // let { matchId } = useParams()
  let matchID = '0';
  // generate random matchId (or use create API for authenticated matches)

  // current user, guest is when id = 0
  const [user, setUser] = useState({
    'id': 0,
    'username': '',
    'avatar': null
  });

  const ApplesClient = Client({
   game: Apples,
    board: ApplesBoard,
    numPlayers: 3,
    debug: true,
    // multiplayer: Local(),
    multiplayer: SocketIO({server: 'localhost:8000'})
  });

  let applesClients=[
    <ApplesClient matchID={matchID} playerID="0" />,
    <ApplesClient matchID={matchID} playerID="1" />,
    <ApplesClient matchID={matchID} playerID="2" />
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Header user={user} setUser={setUser}/>
      <div>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/user/login" element={<LoginPage setUser={setUser}/>}/>
            <Route path="/user/profile" element={<ProfilePage user={user}/>}/>
            <Route path="/user/edit" element={<EditProfile user={user} setUser={setUser}/>}/>
            <Route path="/user/create" element={<CreateUserPage setUser={setUser}/>}/>
            <Route path="/home" element={<Dashboard/>}/>
            <Route path="/creategame" element={<CreateGame applesClients={applesClients}/>}/>
            <Route path="/joingame" element={<Lobby/>}/>
            <Route path="/waitingroom" element={<WaitingRoom/>}/>
            <Route path="/game/apples/:matchId" element={<Apples/>}/>
          </Routes>
        </Container>
      </div>
    </StyledEngineProvider>
  );
};


// pages: edit profile, create custom cards, logout

