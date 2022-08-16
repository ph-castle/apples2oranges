import { React, useState, useEffect } from "react";
import { Client } from 'boardgame.io/react';
import { SocketIO, Local } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';
import { Routes, Route } from 'react-router-dom';
import { Container } from "@mui/material";
import Header from "./features/Header";
import Dashboard from "./features/Dashboard";
import { CreateGame } from "./features/CreateGame";
import Lobby from "./features/Lobby";
import { WaitingRoom } from "./features/WaitingRoom";
import { StyledEngineProvider } from "@mui/material/styles";
import { lobbyClient } from "./features/utils/lobbyClient";

function App() {
  const [matchID, setMatchID] = useState('');

  useEffect(() => {
    getMatchID()
    .then(matchID => {
      console.log(matchID)
      setMatchID(matchID)
    })
    .catch(err => console.log("error getting matchID", err))
  }, [])

  const getMatchID = async() => {
    let { matchID } = await lobbyClient.createMatch('Apples2Oranges', {
      numPlayers: 3
    });
    return matchID;
  }

=======
import { useSelector } from "react-redux";

function App() {
  // let { matchId } = useParams()
  // let matchID = "0";
  const matchID = useSelector((state) => state.main.userMatchID);
  const playerID = useSelector((state) => state.main.userPlayerID);
  // generate random matchId (or use create API for authenticated matches)
>>>>>>> lobby2

  const ApplesClient = Client({
    game: Apples,
    board: ApplesBoard,
    numPlayers: 3,
    debug: true,
    playerID: 0,
    matchID: matchID,
    //multiplayer: Local(),
    multiplayer: SocketIO({server: 'localhost:8000'})
  });

  let applesClients = [
    <ApplesClient matchID={matchID} playerID="0" />,
    <ApplesClient matchID={matchID} playerID="1" />,
    <ApplesClient matchID={matchID} playerID="2" />,
  ];

  return (
    <StyledEngineProvider injectFirst>
      <div>
          <Container maxWidth="lg">
            <Routes>
                {/* <Route path="/profile/:username" element={<EditProfile/>}/> */}
                <Route path="/" element={<Header/>}>
                  <Route path="home" element={<Dashboard/>}/>
                  <Route path="creategame" element={<CreateGame applesClients={applesClients} matchID={matchID} />}/>
                  <Route  path="joingame" element={<Lobby matchID={matchID} />}/>
                  <Route path="waitingroom/:matchId" element={<WaitingRoom matchID={matchID} />}/>
                  <Route  path="game/apples/:matchID" element={<ApplesClient/>}/>
                </Route>
            </Routes>
          </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

// pages: edit profile, create custom cards, logout
