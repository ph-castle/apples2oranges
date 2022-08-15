import { LobbyClient } from 'boardgame.io/client';
import { Lobby } from 'boardgame.io/react';
import TicTacToeBoard from './Board';
import { TicTacToe } from './Game';

export function LobbyTest() {
  return(
     <Lobby
       gameServer={`https://${window.location.hostname}:8000`}
       lobbyServer={`https://${window.location.hostname}:8000`}
       gameComponents={[
         { game: TicTacToe, board: TicTacToeBoard }
       ]}
      />
     );
    };


// export default function LobbyTest () {
// const lobbyClient = new LobbyClient({ server: 'http://localhost:3000'});

// const getGames = async () => {
//   const games = await lobbyClient.listGames();
//   console.log(games);
// }
// getGames();
// }

// import { SocketIO } from 'boardgame.io/multiplayer'

// const ApplesClient = Client({
//   game: Apples,
//   board: Board,
//   multiplayer: SocketIO({ server: 'localhost:8000' }),
// });