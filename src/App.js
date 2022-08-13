import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game/game';
//import { TicTacToeBoard } from './game/Board.js'
import { Apples } from './game/Apples';

const App = Client({ game: Apples, numPlayers: 2,});


export default App;