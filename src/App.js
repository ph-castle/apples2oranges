import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from './game/Apples';
import { ApplesBoard } from './game/ApplesBoard';

const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  numPlayers: 3,
  debug: true,
  // multiplayer: Local(),
  multiplayer: SocketIO({server: 'localhost:8000'})
});

const App = () => (
  <div
    style={{ display: 'flex', justifyContent: 'space-around', gap: '1.25rem' }}
  >
    <ApplesClient playerID="0" />
    <ApplesClient playerID="1" />
    <ApplesClient playerID="2" />
  </div>
);


export default App;