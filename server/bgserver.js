require('dotenv').config();

const {
  Server,
  Origins
 } = require("boardgame.io/server");
const { Apples } = require("../src/game/Apples");

const server = Server({
  games: [Apples],
  origins: [`http://localhost:${process.env.EXPRESS_PORT}`, Origins.LOCALHOST_IN_DEVELOPMENT, `http://localhost:${process.env.APP_PORT}`, `http://localhost:${process.env.PG_PORT}`],
});
const bgPort = process.env.BG_PORT;
server.run(bgPort);
