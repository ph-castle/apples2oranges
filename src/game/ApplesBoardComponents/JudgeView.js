import React from "react";
import PCard from "../../card/PCard.js";
import Card from "../../card/Card.js";
import styles from "../../card/Card.module.css"

export default function JudgeView({ G, ctx, moves}) {
  let cardArray = [];
  for (let playerId in G.submittedAnswers) {
    cardArray.push(
      <Card
        playerId={playerId}
        player={false}
        G={G}
        ctx={ctx}
        moves={moves}
        text={G.submittedAnswers[playerId].body}
      />
    );
  }

  let answers = (
    <div className="player-choices">
      {cardArray}
    </div>
  );

  return (
    <div>
      I have unlimited powwaaaaaaaaah!
      <span className="active-prompt">
        {G.activePrompt.body ? (
          <PCard children={G.activePrompt.body} className={styles.answer_card}/>
        ) : (
          <div>
            <button
              onClick={() => {
                moves.drawRemotePrompt();
              }}
            >
              Draw Prompt!
            </button>
          </div>
        )}
      </span>
      <div className="answer">
        {G.activePrompt.body &&
        Object.keys(G.submittedAnswers).length !== ctx.numPlayers - 1 ? (
          <div>
            <p>Waiting on player selections</p>
          </div>
        ) : (
          answers
        )}
      </div>
    </div>
  );
}
