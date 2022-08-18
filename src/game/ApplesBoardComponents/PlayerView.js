<<<<<<< HEAD
import React, { useState } from 'react';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
// import Card from '../../card/Card.js';

export default function PlayerView({G, ctx, moves, playerID, roundTime, setRoundTime, sendChatMessage, chatMessages }) {
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = (e) => {
    console.log('here is submit');
    e.preventDefault();
    sendChatMessage({ message: chatInput, time: Date.now()});
    console.log('here is after send chat');
    setChatInput('');
  }

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setChatInput(value);
  }
=======
import React, { useState } from "react";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";
>>>>>>> main

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
  roundTime,
  setRoundTime,
  sendChatMessage,
  chatMessages
}) {
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = (e) => {
    console.log('here is submit');
    e.preventDefault();
    sendChatMessage({ message: chatInput, time: Date.now()});
    console.log('here is after send chat');
    setChatInput('');
  }

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setChatInput(value);
  }
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
      THIS IS WHAT THE PLEBS SEE
      <span className="active-prompt">
        {G.activePrompt.text ? (
          <p>{G.activePrompt.text}</p>
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
      <div style={{borderStyle: 'solid', width: '251px'}}>
          {chatMessages.length > 0 ? chatMessages.map(({ payload, sender }, index) => {
            return <div>{`${sender}: ${payload.message}`}</div>
          }) : null}

          <form onSubmit={handleSubmit}>
            <input type="text" value={chatInput} onChange={handleChange} style={{width: '190px'}}/>
            <button type="submit" style={{width: '55px'}}>Send</button>
          </form>
        </div>
      {/* {renderView()} */}
    </div>
  );
}
