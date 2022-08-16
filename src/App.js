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
import { useSelector } from "react-redux";

function App() {
  const matchID = useSelector((state) => state.matchID);
  const playerID = useSelector((state) => state.playerID);

  // useEffect(() => {
  //   getMatchID()
  //   .then(matchID => {
  //     console.log(matchID)
  //     setMatchID(matchID)
  //   })
  //   .catch(err => console.log("error getting matchID", err))
  // }, [])

  // const getMatchID = async() => {
  //   let { matchID } = await lobbyClient.createMatch('Apples2Oranges', {
  //     numPlayers: 3
  //   });
  //   return matchID;
  // }


  // const matchID = useSelector((state) => state.main.userMatchID);
  // const playerID = useSelector((state) => state.main.userPlayerID);

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
                  <Route path="waitingroom/:matchID" element={<WaitingRoom matchID={matchID} />}/>
                  <Route  path="game/apples/:matchID" element={<ApplesClient playerID={playerID} match={matchID}/>}/>
                  {/* <Route path="*" element={<Redirect />} /> */}
                </Route>
            </Routes>
          </Container>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

// pages: edit profile, create custom cards, logout
