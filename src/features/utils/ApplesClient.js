import React, {useState} from 'react'
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Apples } from '../../game/Apples';
import { ApplesBoard } from '../../game/ApplesBoard';

const numPlayers = localStorage.getItem('players');
console.log(numPlayers);

export const ApplesClient = Client({
  game: Apples,
  board: ApplesBoard,
  debug: true,
  matchID: localStorage.getItem("matchID"),
  multiplayer: SocketIO({server: 'localhost:8000'})
  });
