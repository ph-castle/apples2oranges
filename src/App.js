
import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import Hero from "./UI/Hero";
import ProfilePage from "./features/login/ProfilePage";
import EditProfile from "./features/login/EditProfile";
import LoginPage from "./features/login/LoginPage";
import CreateUserPage from "./features/login/CreateUserPage";
import CustomCards from "./features/custom/CustomCards";
import { Apples2Oranges } from './features/gameRoom';
// import BoomBox from './features/Spotify/BoomBox';
import { StyledContainer } from './styles/appStyles';
import Layout from './UI/Layout';

export const code = new URLSearchParams(window.location.search).get('code');

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
        {/* <StyledContainer> */}
          <Routes>
            {/* <Route path="/" element={<Layout user={user} setUser={setUser} />}> */}
            <Route path="/" element={<StyledContainer children={<Outlet />} />}> | {" "}
              <Route index element={<Dashboard />} />
              <Route
                path="user/login"
                element={<LoginPage setUser={setUser} />}
              />
              <Route path="user/profile" element={<ProfilePage user={user} />} />
              <Route
                path="user/edit"
                element={<EditProfile user={user} setUser={setUser} />}
              />
              <Route
                path="user/create"
                element={<CreateUserPage setUser={setUser} />}
              />
              <Route path="user/customcards" element={<CustomCards user={user} />} />
              <Route path="creategame" element={<CreateGame />} />
              <Route path="joingame" element={<Lobby />} />
              <Route path="waitingroom/:matchID" element={<WaitingRoom />} />
            {/* </Route> */}
            {/* </Routes> */}
            </Route>
           {/* <Routes> */}
          <Route path="/game/apples/:matchID" element={<Apples2Oranges />} />
          {/* </Route> */}
        </Routes>

        {/* <BoomBox code={code} /> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}