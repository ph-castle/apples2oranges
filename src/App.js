import * as React from "react";
import { Container } from "@mui/material";
import { Header } from "./features/nav/Header";
import { Lobby } from './features/nav/Lobby'
import { Dashboard } from "./features/nav/Dashboard";
import { CreateGame } from "./features/CreateGame";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Container maxWidth="lg">

            {/* <Dashboard /> */}
          {/* <CreateGame/> */}
          {/* <Lobby /> */}
          <WaitingRoom/>
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

