import * as React from "react";
import { Container } from "@mui/material";
import Header from "../src/features/Header";
import Dashboard from "./features/Dashboard";
import Lobby from "./features/Lobby";
import { CreateGame } from "./features/CreateGame";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Header />
        <Container maxWidth="lg">
          {/* <Dashboard /> */}
          <Lobby />
          {/* <CreateGame /> */}
        </Container>
      </div>
    </StyledEngineProvider>
  );
}

//Game
// const { matchId } = useParams();
//

// <Router>
// <Switch>
//   <Route path="/login" exact>
//     <LoginPage />
//   </Route>
//   <Route path="/" exact>
//     <Redirect to="/product/40344" />
//   </Route>
//   <Route path="/game/:matchId">
//     <ProductDetailPage />
//   </Route>
// </Switch>
// </Router>
