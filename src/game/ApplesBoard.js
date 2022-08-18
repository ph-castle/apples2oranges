import React, { useState } from "react";
import JudgeView from "./ApplesBoardComponents/JudgeView";
import PlayerView from "./ApplesBoardComponents/PlayerView";
// import PlayPhase from './ApplesBoardComponents/PlayPhase';
// import DealPhase from './ApplesBoardComponents/DealPhase';
// import ScoreBoard from './ApplesBoardComponents/ScoreBoard';
// import Timer from './ApplesBoardComponents/Timer';

export function ApplesBoard({ ctx, G, moves, playerID, matchData }) {
  const [roundTime, setRoundTime] = useState();
  //create two different views that will be returned depending on if player is judge or not

  //define functions that affect how the board elements are displayed

  //define board elements on when win condition is met
  let winner = "";
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : null;
  }
  //board elements will change based on phase, stage, and if it is players turn to be judge

  return (
    <div className="Game">
      <div className="View">
        {/* change board view IF player is the current Judge */}
        {ctx.currentPlayer === playerID ? (
          <JudgeView
            G={G}
            ctx={ctx}
            moves={moves}
            roundTime={roundTime}
            setRoundTime={setRoundTime}
          />
        ) : (
          <PlayerView
            G={G}
            ctx={ctx}
            moves={moves}
            playerID={playerID}
            roundTime={roundTime}
            setRoundTime={setRoundTime}
            matchData={matchData}
          />
        )}
      </div>
      {winner}
    </div>
  );
}
