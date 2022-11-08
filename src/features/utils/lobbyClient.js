import { LobbyClient } from "boardgame.io/client";

export const lobbyClient = new LobbyClient({ server: `http://localhost:${process.env.REACT_APP_BG_PORT}` });
