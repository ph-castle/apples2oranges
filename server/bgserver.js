const { Server, Origins } = require("boardgame.io/server");
const { Apples } = require("../src/game/Apples");

const server = Server({
  games: [Apples],
  origins: [`http://localhost:8000`, Origins.LOCALHOST_IN_DEVELOPMENT, 'http://localhost:3000', 'http://localhost:5050', 'http://localhost:5432'],
});
server.run(8000);
