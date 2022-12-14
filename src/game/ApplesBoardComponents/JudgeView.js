import React, { useState } from 'react';
import PCard from "../../card/PCard.js";
import Card from "../../card/Card.js";
import Box from '@mui/material/Box';
import styles from "../../card/Card.module.css";
import {
  StyledContainer,
  StyledTextField,
  StyledSendIcon,
  StyledTypography
} from "../../styles/playerViewStyles";

import { StyledButton } from "../../styles/createGameStyles";

export default function JudgeView({G, ctx, moves, sendChatMessage, chatMessages, matchData }) {
  const [chatInput, setChatInput] = useState('');

  const playerNames = {};

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
        <>
        <StyledContainer>
          <StyledTypography>
          <h3>YOU ARE JUDGING ________!</h3>
          <span className="active-prompt">
            {G.activePrompt.body ? (
              <PCard children={G.activePrompt.body} className={styles.answer_card}/>
            ) : (
              <div>
                <StyledButton
                  variant="contained"
                  onClick={() => {
                    moves.drawRemotePrompt();
                  }}
                >
                  Draw a prompt!
                </StyledButton>
              </div>
            )}
          </span>
          </StyledTypography>
          <Box sx={{width: '60%', margin: '0 auto'}}>
            {answers}
          </Box>
        </StyledContainer>

        <Box sx={{position: 'fixed', height: '600px', maxWidth: '30%', borderStyle: 'solid', right: '10%', top: '8rem', background: 'rgba(0,0,0, 0.8)'}}>
          <div style={{
            overflowWrap: "break-word",
            overflowY: "scroll",
            height: "86%"
          }}>
            {chatMessages.length > 0 ? chatMessages.map(({ payload, sender }, index) => {
              return <div>{`${playerNames[sender]}: ${payload.message}`}</div>
            }) : null}
          </div>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              label="Send chat"
              value={chatInput}
              onChange={handleChange}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <StyledSendIcon type="submit"/>
          </form>
        </Box>
        </>


  );
}
