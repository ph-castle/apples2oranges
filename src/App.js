import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./UI/theme";
import { ThemeProvider } from "@mui/material/styles";
import Hero from "./UI/Hero";
import ProfilePage from "./features/login/ProfilePage";
import EditProfile from "./features/login/EditProfile";
import LoginPage from "./features/login/LoginPage";
import CreateUserPage from "./features/login/CreateUserPage";
import { useSelector } from "react-redux";
import ApplesClient from "./ApplesClient";

export default function App() {
  // // let { matchId } = useParams()
  // // let matchID = "0";

  // current user, guest is when id = 0
  const [user, setUser] = useState({
    id: 0,
    username: "",
    avatar: null,
  });

  // </ThemeProvider>

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header user={user} setUser={setUser} />
        <Hero />
        <Container
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            overflow: "hidden",
          }}
        >
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
            <Route path="/waitingroom" element={<WaitingRoom />} />
            <Route
              path="/game/apples/:matchID"
              element={
                <ApplesClient
                  matchID={localStorage.getItem("matchID")}
                  numPlayers={localStorage.getItem("players")}
                  playerID={localStorage.getItem("id")}
                  credentials={localStorage.getItem("credentials")}
                />
              }
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
