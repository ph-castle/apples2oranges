<<<<<<< HEAD
import * as React from "react";
=======
import React, { useState } from "react";
>>>>>>> 58cf2cdfa88671bc2e5b0040121a3e9cd80d0b3f
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
<<<<<<< HEAD
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
=======
import ProfilePage from './features/login/ProfilePage';
import EditProfile from './features/login/EditProfile';
import LoginPage from './features/login/LoginPage';
import CreateUserPage from './features/login/CreateUserPage';
import { useSelector } from "react-redux";
import ApplesClient from "./ApplesClient";

export default function App() {
  // let { matchId } = useParams()
  // let matchID = "0";
  const matchID = useSelector((state) => state.main.userMatchID);
  const playerID = useSelector((state) => state.main.userPlayerID);

  // current user, guest is when id = 0
  const [user, setUser] = useState({
    'id': 0,
    'username': '',
    'avatar': null
  });

  // let applesClients = [
  //   <ApplesClient matchID={matchID} playerID="0" />,
  //   <ApplesClient matchID={matchID} playerID="1" />,
  //   <ApplesClient matchID={matchID} playerID="2" />,
  // ];

  return (
    <StyledEngineProvider injectFirst>
      <Header user={user} setUser={setUser}/>
      <div>
        <Container maxWidth="lg">
>>>>>>> 58cf2cdfa88671bc2e5b0040121a3e9cd80d0b3f
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/user/login" element={<LoginPage setUser={setUser}/>}/>
            <Route path="/user/profile" element={<ProfilePage user={user}/>}/>
            <Route path="/user/edit" element={<EditProfile user={user} setUser={setUser}/>}/>
            <Route path="/user/create" element={<CreateUserPage setUser={setUser}/>}/>
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/waitingroom/:matchID" element={<WaitingRoom />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
            <Route
<<<<<<< HEAD
              path="/game/apples/:matchID"
              element={
                <ApplesClient
                  matchID={localStorage.getItem("matchID")}
                  numPlayers={localStorage.getItem("players")}
                  playerID={localStorage.getItem("id")}
                  credentials={localStorage.getItem("credentials")}
                />
              }
=======
              path="/game/apples/:matchId"
              element={<ApplesClient matchID={matchID} playerID={playerID} />}
>>>>>>> 58cf2cdfa88671bc2e5b0040121a3e9cd80d0b3f
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
<<<<<<< HEAD
}

export default App;
=======
};

// pages: edit profile, create custom cards, logout
>>>>>>> 58cf2cdfa88671bc2e5b0040121a3e9cd80d0b3f
