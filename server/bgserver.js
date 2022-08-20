const { Server, Origins } = require("boardgame.io/server");
const { Apples } = require("../src/game/Apples");
const server = Server({
  games: [Apples],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
});
server.run(8000);
