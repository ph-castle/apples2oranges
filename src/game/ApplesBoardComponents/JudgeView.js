import React, { useState } from 'react';
import Timer from "./Timer";
import PCard from "../../card/PCard.js";
import Card from "../../card/Card.js";
import Box from '@mui/material/Box';
import styles from "../../card/Card.module.css";

export default function JudgeView({G, ctx, moves, roundTime, setRoundTime, sendChatMessage, chatMessages, matchData }) {
  const [chatInput, setChatInput] = useState('');


  const playerNames = {};
  console.log(matchData);

  // creates object with player id as key
  for (let i = 0; i < matchData.length; i++) {
    playerNames[matchData[i].id] = matchData[i].name;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    sendChatMessage({ message: chatInput, time: Date.now()});
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
      THIS IS WHAT THE JUDGE SEES
      <span className="active-prompt">
        {G.activePrompt.body ? (
          <PCard children={G.activePrompt.body} className={styles.answer_card}/>
        ) : (
          <div>
            <button
              onClick={() => {
                moves.drawRemotePrompt();
                setRoundTime(60);
              }}
            >
              Select me Daddy!
            </button>
          </div>
        )}
      </span>
      <div className="answer">
        {G.activePrompt.body &&
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
            return <div>{`${playerNames[sender]}: ${payload.message}`}</div>
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
