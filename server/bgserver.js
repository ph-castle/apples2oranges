const { default: axios } = require('axios');
const { Server, Origins } = require('boardgame.io/server');
const { Apples } = require('../src/game/Apples');


const server = Server({
  games: [Apples],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
//   credentials/authentification stuff,
});


//Lobby API and Server are run on same port
// const lobbyConfig = {
  //   apiPort: 8000,
  //   apiCallback: () => console.log('Running Lobby API on port 8000')
  // };
  
  
  // Add middleware to the create game route.
  server.router.use('/games/:name/create', async (ctx, next) => {
    // Decide number of players etc. based on some other API.
    const { setupData } = await axios.get('http://localhost:45000/cards/prompt');
    // Set request body to be used by the create game route.
    //ctx.request.body.numPlayers = numPlayers;
    ctx.request.body.setupData = setupData;
    next();
  });
  
  
  
  server.run(8000);