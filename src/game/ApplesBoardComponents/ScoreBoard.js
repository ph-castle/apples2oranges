import React from "react";

export default function ScoreBoard({
  G,
  ctx,
  playerID,
  matchData,
}) {

  let standings = {};  // {name:  , winningCards: }
  let players = G.players;

  players.forEach((player, index) => {
    // validate that player.playerID === index;
    standings[index] = player;
  });
  console.log(standings);

  matchData.forEach((namedPlayer) => {
    let playerID = namedPlayer.id;
    let playerName = namedPlayer.name;
    standings[playerID].playerName = playerName;
  });
  console.log(standings);

  standings.values().sort((a, b) => (a.winningHands - b.winningHands));

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
        {standings.map((standing) => {
      return <li>standing.name</li>
    })}
      </ol>
    </div>
  );
}
