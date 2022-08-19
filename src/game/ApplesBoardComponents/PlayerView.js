import React from "react";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
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

  return (
    <div>
      I am a pleb. A filthy casual pleb
      <span className="active-prompt">
        {G.activePrompt.text ? (
          <p>{G.activePrompt.text}</p>
        ) : (
          <>
            <p>Waiting on Judge to draw a prompt card!</p>
            <ScoreBoard G={G} ctx={ctx} playerID={playerID} matchData={matchData} />
          </>
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

          </>
        )}
      </div>
    </div>
  );
}