import { Apples } from "./game/Apples";
import { ApplesBoard } from "./game/ApplesBoard";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

export default function ApplesClient({ decks, playerID, matchID }) {
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
