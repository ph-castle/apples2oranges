<<<<<<< HEAD
import React from 'react';
// import ReactDOM from 'react-dom';
import { Client } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer';
// import GameBoard from './components/board';
// import { Gamegame } from './components/game';
import { Apples } from './components/Apples';

// var GamegameClient = Client({
//   board: GameBoard,
//   game: Gamegame,
//   numPlayers: 3,
//   debug: true,
//   multiplayer: SocketIO({server: 'localhost:8000'}),
// });

const ApplesClient = Client({
  game: Apples,
  numPlayers: 3,
  debug: true,
  multiplayer: SocketIO({server: 'localhost:8000'})
});

const App = () => (
  <div
    style={{ display: 'flex', justifyContent: 'space-around', gap: '1.25rem' }}
  >
    {/* <GamegameClient playerID="0" />
    <GamegameClient playerID="1" /> */}
    <ApplesClient playerID="0" />
    <ApplesClient playerID="1" />
    <ApplesClient playerID="2" />
  </div>
);

// const App = (Client({game: Apples, numPlayers: 2}))

=======
import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game/game';
import { Apples } from './game/Apples';

const App = Client({ game: Apples, numPlayers: 3,});
>>>>>>> 36d24bca196302032f8b2ce4e7d193022d1ce14c


export default App;