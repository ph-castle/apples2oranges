import React, {useState, useEffect} from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Game } from './components/game.js';
import { Board } from './components/board.js';

const GameClient = Client({
  game: Game,
  board: Board,
  debug: true,
  multiplayer: SocketIO({server: "localhost:8000"})
});

function App() {
  const [playerID, setPlayerID] = useState('1');

  return (
    <div className="App">
      <GameClient playerId={playerID} />
    </div>
  );
}

export default App;
