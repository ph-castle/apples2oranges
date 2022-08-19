import React, { useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";
import PCard from "../../card/PCard.js";
import styles from "../../card/Card.module.css"

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
  matchData
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
  let cardArray = [];
  for (let playerId in G.submittedAnswers) {
    cardArray.push(
      <Card
        playerId={playerId}
        player={false}
        G={G}
        ctx={ctx}
        text={G.submittedAnswers[playerId].body}
      />
    );
  }
  let submittedAnswers = (
    <div className="player-choices">
      {cardArray}
    </div>
  );

  useEffect(()=> {
    if (cardArray.length){
      setTimeout(()=> {
        cardArray[0].moves.playAnswer();
      }, 60000)
    }
  })
  return (
    <div>
      I am a pleb. A filthy casual pleb
      <span className="active-prompt">
        {G.activePrompt.body ? (
          <PCard children={G.activePrompt.body} className={styles.answer_card} />
        ) : (
          <p>Waiting on Judge to draw a prompt card!</p>
        )}
      </span>
      <div className="answercards">
        {Object.keys(G.submittedAnswers).length !== ctx.numPlayers - 1 ? (
          <>
            {G.players[playerID].hand.length < 7 ?
              submittedAnswers:
              answers
            }
          </>
        ) : (
          <>
            {submittedAnswers}
            <ScoreBoard G={G} ctx={ctx} playerID={playerID} matchData={matchData} />
          </>
        )}
      </div>
    </div>
  );
}
