import React, { useState } from 'react';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';

export default function PlayerView({G, ctx, moves, playerID}) {

  let answers;
  if (G.activePrompt.text) {
    answers = (
      <div>
        {G.players[playerID].hand.map((card, i) => {
          return (
            // add on click event listener to playAnswer
            <span
              key={card.id}
              onClick={()=> moves.playAnswer(i)}
            >
              <p>{card.text}</p>
            </span>
          )
        })}
        {Object.keys(G.submittedAnswers).length !== (ctx.numPlayers - 1) ?
          <Timer time={30} />:
          <ScoreBoard />
        }
      </div>
    )
  }

  return (
    <div>
      THIS IS WHAT THE PLEBS SEE
      <span className="active-prompt">
        {G.activePrompt.text?
            <p>
              {G.activePrompt.text}
            </p>:
            <p>
              Waiting on Judge to wake up and pull his foot out of his ass
            </p>
         }
        </span>

        <div className="answercards">
          {answers}
        </div>
      {/* {renderView()} */}
    </div>
  )
}