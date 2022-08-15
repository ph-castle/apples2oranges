
const { Server, Origins } = require('boardgame.io/server');
const { Apples } = require('../src/components/Apples');
const server = Server({
  games: [Apples],
  origins: ['http://127.0.0.1:8000'],
});
/// one of these goes to client
server.run(8000);
//server.run(3000);

const lobbyConfig = {
  apiPort: 8000,
  apiCallback: () => console.log('Running Lobby API on port 8000')
};




