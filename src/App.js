import * as React from "react";
import { Container } from "@mui/material";
import { Header } from "../src/features/nav/Header";
import { Dashboard } from "./features/Dashboard";
import { StyledEngineProvider } from "@mui/material/styles";
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Container maxWidth="lg">
            {/* <Dashboard /> */}
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
