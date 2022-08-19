import React from "react";
export default function ScoreBoard({
  G,
  ctx,
  playerID,
  matchData,
}) {
  let standings = {};  // {name:  , winningCards: }
  let players = G?.players;
  players?.forEach((player, index) => {
    // validate that player.playerID === index;
    standings[index] = player;
  });
  console.log(standings);
  matchData?.forEach((namedPlayer) => {
    let playerID = namedPlayer?.id;
    let playerName = namedPlayer?.name;
    standings[playerID].playerName = playerName;
  });
  console.log(standings);
  var currStandings = Object.values(standings).sort((a, b) => (b.winningCards.length - a.winningCards.length));
  console.log(currStandings);
  return (
    <div>
      {" "}
      This is the scoreboard
      <ol>
        {currStandings.map((standing) => {
          console.log('standing', standing);
      return <li>{standing.playerName}</li>
    })}
      </ol>
    </div>
  );
}