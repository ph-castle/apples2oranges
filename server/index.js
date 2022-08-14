const { Server, Origins } = require('boardgame.io/server');
const { Apples } = require('../src/components/Apples');
const server = Server({
  games: [Apples],
  origins: ['http://127.0.0.1:3000'],
});
server.run(8000);
