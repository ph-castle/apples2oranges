import React from 'react';
import { ApplesClient } from './utils/ApplesClient';

export const Apples2Oranges = () => {

  // const AppleClient = Client({
  //   game: decks),
  //   board: ApplesBoard,
  //   numPlayers: 3,
  //   debug: true,
  //   // multiplayer: Local(),
  //   playerID: playerID,
  //   matchID: matchID,
  //   multiplayer: SocketIO({ server: "localhost:8000" }),
  // });

  return (
    <ApplesClient
      matchID={localStorage.getItem("matchID")}
      playerID={localStorage.getItem("id")}
      credentials={localStorage.getItem("credentials")}
    />
  )
}