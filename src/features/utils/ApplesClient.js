import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from '../../game/Apples';
import { ApplesBoard } from '../../game/ApplesBoard';

export const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  debug: true,
  matchID: localStorage.getItem("matchID"),
  multiplayer: SocketIO({server: 'http://54.183.50.214:8000'})
  });
