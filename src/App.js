import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game/game';
import { Apples } from './game/Apples';

const App = Client({ game: Apples, numPlayers: 3,});


export default App;