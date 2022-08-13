import * as React from "react";

import { Header } from "../src/features/nav/Header";
import { Dashboard } from "./features/Dashboard";
import { StyledEngineProvider } from "@mui/material/styles";
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Dashboard />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
