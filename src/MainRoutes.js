import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./features/Dashboard";
import CreateGame from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { Apples2Oranges } from "./features/gameRoom";

import ProfilePage from "./features/login/ProfilePage";
import EditProfile from "./features/login/EditProfile";
import LoginPage from "./features/login/LoginPage";
import CreateUserPage from "./features/login/CreateUserPage";

import { StyledContainer } from "./styles/mainRoutesStyles";

export default function MainRoutes({ user, setUser }) {
  return (
    <StyledContainer>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/user/login" element={<LoginPage setUser={setUser} />} />
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
  );
}
