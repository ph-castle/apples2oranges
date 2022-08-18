import React, { useState } from "react";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";
import PCard from "../../card/PCard.js";
import styles from "../../card/Card.module.css"

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
  roundTime,
  setRoundTime,
}) {
  let answers;
  if (G.activePrompt.body) {
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
              text={card.body}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      THIS IS WHAT THE PLEBS SEE
      <span className="active-prompt">
        {G.activePrompt.text ? (
          <PCard children={G.activePrompt.body} className={styles.answer_card} />
        ) : (
          <p>Waiting on Judge to wake up and pull his foot out of his ass</p>
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
            <ScoreBoard />
          </>
        )}
      </div>
      {/* {renderView()} */}
    </div>
  );
}
