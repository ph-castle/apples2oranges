import * as React from "react";
import { Container } from "@mui/material";
import { Header } from "../src/features/nav/Header";
// import { Dashboard } from "./features/nav/Dashboard";
import { Lobby } from "./features/nav/Lobby";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Container maxWidth="lg">
          {/* <Dashboard /> */}
          <Lobby />
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
