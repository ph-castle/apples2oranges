import React, { useState } from 'react';
import Timer from "./Timer";
import Card from "../../card/Card.js";
import Box from '@mui/material/Box';

export default function JudgeView({G, ctx, moves, roundTime, setRoundTime, sendChatMessage, chatMessages }) {
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

  let cardArray = [];
  for (let playerId in G.submittedAnswers) {
    cardArray.push(
      <Card
        playerId={playerId}
        player={false}
        G={G}
        ctx={ctx}
        moves={moves}
        setRoundTime={setRoundTime}
        text={G.submittedAnswers[playerId].text}
      />
    );
  }

  let answers = (
    <div className="player-choices">
      {cardArray}
      {/* <Timer time={30} /> */}
    </div>
  );

  return (
    <div>
      THIS IS WHAT THE JUDGE SEES
      <span className="active-prompt">
        {G.activePrompt.text ? (
          <p>{G.activePrompt.text}</p>
        ) : (
          <div>
            <p>Push button to begin round</p>
            <button
              onClick={() => {
                moves.drawPrompt();
                setRoundTime(60);
              }}
            >
              Select me daddy!
            </button>
          </div>
        )}
      </span>
      <div className="answer">
        {G.activePrompt.text &&
        Object.keys(G.submittedAnswers).length !== ctx.numPlayers - 1 ? (
          <div>
            <p>Waiting on player selections</p>
            <Timer roundTime={roundTime} setRoundTime={setRoundTime} />
          </div>
        ) : (
          answers
        )}
      </div>

      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        margin="auto"
        alignItems="center"
        justifyContent="center"
      >
        {chatMessages.length > 0 ? chatMessages.map(({ payload, sender }, index) => {
            return <div>{`${sender}: ${payload.message}`}</div>
          }) : null}

          <form onSubmit={handleSubmit}>
            <input type="text" value={chatInput} onChange={handleChange} style={{width: '190px'}}/>
            <button type="submit" style={{width: '55px'}}>Send</button>
          </form>
      </Box>

      {/* {renderView()} */}
    </div>
  );
}
