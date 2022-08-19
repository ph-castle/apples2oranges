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

  Object.values(standings).sort((a, b) => (a.winningHands - b.winningHands));


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