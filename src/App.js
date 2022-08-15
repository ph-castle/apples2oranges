import React, { useState } from "react";
import { Container } from "@mui/material";
import { Header } from "../src/features/nav/Header";
import { Dashboard } from "./features/nav/Dashboard";
import { CreateGame } from "./features/CreateGame";
import { StyledEngineProvider } from "@mui/material/styles";
import Login from './features/login/Login.jsx';

export default function App() {

  const [user, setUser] = useState({
    'id': 0,
    'username': '',
    'avatar': null
  });

  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Container maxWidth="lg">
          <Login user={user} setUser={setUser}/>
            {/* <Dashboard /> */}
          <CreateGame/>
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

