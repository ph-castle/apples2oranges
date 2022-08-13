const Server = require('boardgame.io/server').Server;

const game = require('../src/components/game').game;
const server = Server({
  games: [game],
//   credentials/authentification stuff,
});
server.run(8000);