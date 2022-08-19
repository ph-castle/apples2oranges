import React, { useState } from 'react';
import Timer from "./Timer";
import PCard from "../../card/PCard.js";
import Card from "../../card/Card.js";
import Box from '@mui/material/Box';
import styles from "../../card/Card.module.css";
import {
  StyledContainer,
  StyledGrid,
  StyledGridLeft,
  StyledGridRight,
  StyledTextField,
  StyledSendIcon,
  StyledTypography
} from "../../styles/playerViewStyles";

import { StyledButton } from "../../styles/createGameStyles";

export default function JudgeView({G, ctx, moves, sendChatMessage, chatMessages, matchData }) {
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
    <StyledContainer>
       <StyledGrid container spacing={2}>
        <StyledGridLeft item xs={9}>
          <StyledTypography>
          I have unlimited powwaaaaaaaaah!
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
                  Select me Daddy!
                </StyledButton>
              </div>
            )}
          </span>
          </StyledTypography>
        </StyledGridLeft>
        <StyledGridRight item xs={3}>
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
        </StyledGridRight>
       </StyledGrid>
    </StyledContainer>

  );
}
