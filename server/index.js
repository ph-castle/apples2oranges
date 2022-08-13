import TicTacToe from '../src/Game.js';
const { Server } = require('boardgame.io/server');

const server = Server({
  games: [TicTacToe],
  origins: [
    'localhost'
  ],
}
);

// const lobbyConfig = {
//   apiPort: 8080,
//   apiCallback: () => console.log('Running Lobby API on port 8080')
// };


server.run(3000);