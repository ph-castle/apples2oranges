import React from "react";

export default function ScoreBoard({
  G,
  ctx,
  playerID,
  matchData,
}) {

  let standings = {};
  let players = G.players;
  let playersWithNames = [];
  let playerNames = {};

  matchData.forEach((namedPlayer) => {
    let playerID = namedPlayer.id;
    let playerName = namedPlayed.name;
    playerNames[playerID] = playerName;
  });
  console.log(playerNames);

  players.forEach((player, index) => {
    player.playerID = index;
    player.
  });

  }

  function calculateStandings()

  // G = {
  //   players:[
  //     {hand: [], winningCards: []}, //0
  //     {hand: [], winningCard: []}   //1
  //   ],
  //   secret: {
  //     playRound: 1
  //     ...
  //   }
  //   ...
  // }

  // ctx = {
  //   numPlayers: 2
  //   turn: 1
  //   phase: "play"
  //   ...
  // }

  // matchData = [
  //   {
  //     id: 0,
  //     name: 'Bob',
  //     ...
  //   }
  // ]

  // calculate standings
  // add pointer at winner
  // make a different view for game over
  // nice to have:
   // highlight your player
   // say how many rounds left
   // if logged in, could give running standings


  return (
    <div>
      {" "}
      This is the scoreboard
      <ol>
        <li>FIRST</li>
        <li>SECOND</li>
        <li>THIRD</li>
      </ol>
    </div>
  );
}
