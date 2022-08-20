import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";
import PCard from "../../card/PCard.js";
import styles from "../../card/Card.module.css";
import {
  StyledContainer,
  StyledTextField,
  StyledSendIcon,
  StyledTypography
} from "../../styles/playerViewStyles";
import { Box } from '@mui/material';

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
  sendChatMessage,
  chatMessages,
  matchData
}) {
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
    <>
    <StyledContainer>
        <StyledTypography>
        <h3>YOU ARE A PLAYER!</h3>
        <span className="active-prompt">
        {G.activePrompt.body ? (
          <PCard children={G.activePrompt.body} className={styles.answer_card} />
        ) : (
          <>
            <p>Waiting on Judge to start the turn</p>
            <ScoreBoard G={G}  ctx={ctx} playerID={playerID} matchData={matchData}/>
          </>
        )}
        </span>
        </StyledTypography>
        <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
          gap: '1em',
          mt: '1em',
          justifyItems: 'center',
          overflowY: 'scroll',
          width: '75%',
        }}
      >
          {G.submittedAnswers[playerID] === undefined ?
            (G.activePrompt.body ?
            G.players[playerID].hand.map((card, i) =>
              (

                <Card
                  G={G}
                  ctx={ctx}
                  player={true}
                  playerId={i}
                  moves={moves}
                  key={card.id}
                  text={card.body}
                />

            )) : submittedAnswers)
          :
          null}
        </Box>
        </StyledContainer>

        <Box sx={{position: 'fixed', height: '600px', borderStyle: 'solid', right: '10%', top: '8rem', background: 'rgba(0,0,0, 0.8)'}}>
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
