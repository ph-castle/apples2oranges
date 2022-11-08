import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from '../../game/Apples';
import { ApplesBoard } from '../../game/ApplesBoard';

export const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  debug: true,
  multiplayer: SocketIO({server: `http://localhost:${process.env.REACT_APP_BG_PORT}` })
  });

