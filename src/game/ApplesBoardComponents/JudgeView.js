import React from 'react';
import Timer from './Timer';

export default function JudgeView({G, ctx, moves, roundTime, setRoundTime}) {

  let answers = (
      <div className="player-choices">
        {Object.keys(G.submittedAnswers).map((answer, i) => {
          return (
            <span
              key={i}
              onClick={()=>{moves.pickWinner(i); setRoundTime(60)}}

            >
              <p>{G.submittedAnswers?.[answer].text}</p>
            </span>
          )
        })}
        {/* <Timer time={30} /> */}
      </div>
    )


  return (
    <div>
      THIS IS WHAT THE JUDGE SEES
      <span className="active-prompt">
        {G.activePrompt.text?
          <p>
            {G.activePrompt.text}
          </p>:
          <div>
            <p>
              Push button to begin round
            </p>
            <button onClick={()=> {moves.drawPrompt(); setRoundTime(60)}}>Select me daddy!</button>
          </div>
        }
      </span>
      <div className="answer">
        {/* {console.log(G.submittedAnswers)} */}
        {G.activePrompt.text && Object.keys(G.submittedAnswers).length !== (ctx.numPlayers - 1) ?
          <div>
            <p>waiting on player selections</p>
            <Timer roundTime={roundTime} setRoundTime={setRoundTime} />
          </div>:
          answers
        }
      </div>
      {/* {renderView()} */}
    </div>
  )
}