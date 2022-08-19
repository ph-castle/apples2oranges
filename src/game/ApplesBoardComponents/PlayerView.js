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
import { Box, Grid } from '@mui/material';

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
  // let answers;
  // if (G.activePrompt.body) {
  //   answers =

  //         );
  //       })

  // }
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
        // style={{ marginTop: '1em' }}
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

            )) : null)
          :
          null}
        </Box>
        </StyledContainer>

        <Box sx={{position: 'fixed', height: '600px', borderStyle: 'solid', right: '10%', top: '8rem'}}>
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

{/* <StyledContainer> */}

{/* <StyledGrid container spacing={2}>
  <StyledGridLeft item xs={9}>
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
    <Box
    sx={{
      p: 2,
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      },
      gap: '2em',
      mt: '1em',
      justifyItems: 'center',
      overflowY: 'scroll',
    }}
    style={{ marginTop: '1em' }}
  >
      {G.submittedAnswers[playerID] === undefined ?
        <>
          {answers}
        </>
      :
      null}
    </Box>
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
</StyledContainer> */}