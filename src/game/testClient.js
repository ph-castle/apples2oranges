import React from 'react';
import { Client } from 'boardgame.io/react';
import { Apples } from './Apples';
import { Local, Socket } from 'boardgame.io/multiplayer';
import { ApplesBoard } from './ApplesBoard';

const Test = Client({
  game: Apples,
  board: ApplesBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  numPlayers: 3,
  debug: true,
  matchID: 'tM8w-LBi-bR',
});

// matchID: tM8w-LBi-bR
// player0: {
//   playerName: 'host',
//   playerID: '0',
//   playerCredentials: 'Szx3YnT-FstskFd38ZqY8',
// }
// player1: {
//   playerName: 'player1',
//   playerID: '1',
//   playerCredentials: 'Tvk53pihT0E5WPLKB8g5N',
// }
// player2: {
//   playerName: 'player2',
//   playerID: '2',
//   playerCredentials: 'LrJDnzlA35b-1B_eWnmi2',
// }

  function addHost() {
    lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: "host"})
    .then(player => {
      console.log(`credentials and id returned for player host`, player);
      dispatch(setPlayerID(player.playerID));
      dispatch(setPlayerCredentials(player.playerCredentials));
    })
    .catch((err) => {
    console.log("catch all error in gehost from join gameclickHandler", err);
    });
  }

  function addPlayer1() {
    lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: "player1"})
    .then(player => {
      console.log(`credentials and id returned for player1`, player);
      dispatch(setPlayerID(player.playerID));
      dispatch(setPlayerCredentials(player.playerCredentials));
    })
    .catch((err) => {
    console.log("catch all error in getPlayer1 from join gameclickHandler", err);
    });
  }

  function addPlayer2() {
    lobbyClient.joinMatch('Apples2Oranges', matchID, { playerName: "player2"})
    .then(player => {
      console.log(`credentials and id returned for player2`, player);
      dispatch(setPlayerID(player.playerID));
      dispatch(setPlayerCredentials(player.playerCredentials));
    })
    .catch((err) => {
    console.log("catch all error in getPlayer2 from join gameclickHandler", err);
    });
  }

//const App = Client({game: 'Apples2Oranges'});


// const ApplesClient = Client({
//   game: Apples,
//   board: ApplesBoard,
//   multiplayer: SocketIO({ server: 'localhost:8000' }),
//   // multiplayer: Local({
//   //   // Enable localStorage cache.
//   //   persist: true,
//   //   // Set custom prefix to store data under. Default: 'bgio'.
//   //   storageKey: 'bgio',
//   // });
//   numPlayers: 3,
//   debug: true,
//   playerID: 0,
//   matchID: 'tM8w-LBi-bR',
// });

// update(state) {
//   if (state === null) return;
//   // ...
// }

  return(
  <div>
    <Button onClick={addHost}>
      Addd Host
      </Button>
       <Button onClick={addPlayer1}>
        Addd Player 1
       </Button>
       <Button onClick={addPlayer2}>
       Addd Player 2
    </Button>
    <ApplesClient playerID="0" />
    <ApplesClient playerID="1" />
    <ApplesClient playerID="2" />
  </div>
  );
}

export default Test;


<Button onClick={addHost}>
Addd Host
</Button>
 <Button onClick={addPlayer1}>
  Addd Player 1
 </Button>
 <Button onClick={addPlayer2}>
 Addd Player 2
 </Button>


