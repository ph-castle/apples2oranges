<<<<<<< HEAD
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
=======
import './styles/App.css';
>>>>>>> 456631c53b5e1f66d1af5b268b77692cab1213d4

function App() {
  const [playerID, setPlayerID] = useState('1');

  return (
    <div className="App">
<<<<<<< HEAD
      <GameClient playerId={playerID} />
=======
      Go Team Howl's Moving Castle!
>>>>>>> 456631c53b5e1f66d1af5b268b77692cab1213d4
    </div>
  );
}

export default App;
