import { LobbyClient } from 'boardgame.io/client';


export default function Lobby () {
const lobbyClient = new LobbyClient({ server: 'http://localhost:3000'});

const getGames = async () => {
  const games = await lobbyClient.listGames();
  console.log(games);
}
getGames();
}

import { SocketIO } from 'boardgame.io/multiplayer'

const ApplesClient = Client({
  game: Apples,
  board: Board,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});