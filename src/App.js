import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
      <Header />
      <div>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/user/login" element={<LoginPage setUser={setUser}/>}/>
            <Route path="/user/profile" element={<ProfilePage user={user}/>}/>
            <Route path="/user/edit" element={<EditProfile user={user} setUser={setUser}/>}/>
            <Route path="/user/create" element={<CreateUserPage setUser={setUser}/>}/>
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/waitingroom" element={<WaitingRoom />} />
            <Route
              path="/game/apples/:matchId"
              element={<ApplesClient matchID={matchID} playerID={playerID} />}
            />
          </Routes>
        </Container>
      </div>
    </StyledEngineProvider>
  );
};

// pages: edit profile, create custom cards, logout
