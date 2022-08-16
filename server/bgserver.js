const { Server, Origins } = require('boardgame.io/server');
<<<<<<< HEAD
// const { Gamegame } = require('../src/components/game');
=======
>>>>>>> lobby2
const { Apples } = require('../src/game/Apples');
const server = Server({
  games: [Apples],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
//   credentials/authentification stuff,
});
server.run(8000);

<<<<<<< HEAD
=======
//Lobby API and Server are run on same port
// const lobbyConfig = {
//   apiPort: 8000,
//   apiCallback: () => console.log('Running Lobby API on port 8000')
// };

>>>>>>> lobby2
