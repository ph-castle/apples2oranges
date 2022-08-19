import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";
import PCard from "../../card/PCard.js";
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
  console.log(matchData);

  // creates object with player id as key
  for (let i = 0; i < matchData.length; i++) {
    playerNames[matchData[i].id] = matchData[i].name;
  }

  console.log(playerNames);

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
    <StyledContainer>
      <StyledGrid container spacing={2}>
        <StyledGridLeft item xs={9}>
          <StyledTypography>
          <h3>YOU ARE A PLAYER!</h3>
          <span className="active-prompt">
            {G.activePrompt.body ? (
              <PCard children={G.activePrompt.body} className={styles.answer_card} />
            ) : (
              <p>Waiting on Judge to start the turn</p>
            )}
          </span>
          <div className="answercards">
            {Object.keys(G.submittedAnswers).length !== ctx.numPlayers - 1 ? null
            : (
              <>
                <ScoreBoard />
              </>
            )}
          </div>
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