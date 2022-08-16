import React, { useState, useEffect } from "react";
import axios from "axios";
import { Apples } from "./game/Apples";
import { ApplesBoard } from "./game/ApplesBoard";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

export default function ApplesClient({ playerID, matchID }) {
  const [decks, setDecks] = useState([]);
  // generate random matchId (or use create API for authenticated matches)
  useEffect(() => {
    //TODO: Request is 404 on my end. Maybe include the localhost with the port here in the get request?
    axios.get("/cards/prompt").then((res) => {
      console.log(res.data);
      setDecks(res.data);
    });
  }, [decks]);
  if (!decks.length) {
    // TODO: display a message here that the decks are loading
    return <div>Waiting for decks...</div>;
  }
  return Client({
    game: Apples(decks),
    board: ApplesBoard,
    numPlayers: 3,
    debug: true,
    // multiplayer: Local(),
    playerID: playerID,
    matchID: matchID,
    multiplayer: SocketIO({ server: "localhost:8000" }),
  });
}
