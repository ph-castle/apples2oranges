const { Server, Origins } = require("boardgame.io/server");
const { Apples } = require("../src/game/Apples");

const server = Server({
  games: [Apples],
  origins: [`http://localhost:8000`],
});
server.run(8000);
