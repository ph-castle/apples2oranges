import React, { useState } from "react";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
  roundTime,
  setRoundTime,
  matchData
}) {
  let answers;
  if (G.activePrompt.text) {
    answers = (
      <div>
        {G.players[playerID].hand.map((card, i) => {
          return (
            <Card
              G={G}
              ctx={ctx}
              player={true}
              playerId={i}
              moves={moves}
              key={card.id}
              text={card.text}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <span className="active-prompt">
        {G.activePrompt.text ? (
          <p>{G.activePrompt.text}</p>
        ) : (
          <>
            <ScoreBoard G={G}  ctx={ctx} playerID={playerID} matchData={matchData}/>
          </>

        )}
      </span>
      <div className="answercards">
        {Object.keys(G.submittedAnswers).length !== ctx.numPlayers - 1 ? (
          <>
            {answers}
            <Timer roundTime={roundTime} setRoundTime={setRoundTime} />
          </>
        ) : (
          <>
            <Timer roundTime={roundTime} setRoundTime={setRoundTime} />

          </>
        )}
      </div>
      {/* {renderView()} */}
    </div>
  );
}