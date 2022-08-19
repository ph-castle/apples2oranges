import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './features/Header';
import Dashboard from './features/Dashboard';
import { CreateGame } from './features/CreateGame';
import Lobby from './features/Lobby';
import { WaitingRoom } from './features/WaitingRoom';
import { StyledEngineProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import Hero from './UI/Hero';
import ProfilePage from './features/login/ProfilePage';
import EditProfile from './features/login/EditProfile';
import LoginPage from './features/login/LoginPage';
import CreateUserPage from './features/login/CreateUserPage';
// import { useSelector } from "react-redux";
import { Apples2Oranges } from './features/gameRoom';

import { StyledContainer, StyledBox } from './styles/appStyles';

export default function App() {
  const [user, setUser] = useState({
    id: 0,
    username: '',
    avatar: null,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header user={user} setUser={setUser} />
        <Hero />
        <StyledContainer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route
              path="/user/login"
              element={<LoginPage setUser={setUser} />}
            />
            <Route path="/user/profile" element={<ProfilePage user={user} />} />
            <Route
              path="/user/edit"
              element={<EditProfile user={user} setUser={setUser} />}
            />
            <Route
              path="/user/create"
              element={<CreateUserPage setUser={setUser} />}
            />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/joingame" element={<Lobby />} />
            <Route path="/waitingroom/:matchID" element={<WaitingRoom />} />
            <Route path="/game/apples/:matchID" element={<Apples2Oranges />} />
          </Routes>
        </StyledContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
// import React, { useState } from "react";
// import Header from "./features/Header";
// import MainRoutes from "./MainRoutes";
// import Hero from "./UI/Hero";

// export default function App() {
//   const [user, setUser] = useState({
//     id: 0,
//     username: "",
//     avatar: null,
//   });

//   return (
//     <>
//       <Header user={user} setUser={setUser} />
//       <Hero />
//       <MainRoutes user={user} setUser={setUser} />
//     </>
//   );
// }
