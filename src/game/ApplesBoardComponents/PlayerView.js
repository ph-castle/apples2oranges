import React from "react";
import ScoreBoard from "./ScoreBoard";
import Card from "../../card/Card.js";
import PCard from "../../card/PCard.js";
import styles from "../../card/Card.module.css";
import {
  StyledContainer,
  StyledTypography
} from "../../styles/playerViewStyles";
import { Box } from '@mui/material';

export default function PlayerView({
  G,
  ctx,
  moves,
  playerID,
  matchData
}) {

  let playersRemaining = matchData.length - 1;
  let cardArray = [];
  for (let playerId in G.submittedAnswers) {
    playersRemaining--;
    cardArray.push(
      <Card
        playerId={playerId}
        player={false}
        G={G}
        ctx={ctx}
        text={G.submittedAnswers[playerId].body}
        showAnswers={true}
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
          {G.activePrompt.body
          && (G.submittedAnswers[playerID] === undefined
             ? G.players[playerID].hand.map((card, i) =>
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
              ))
              : (playersRemaining === 0
                ? submittedAnswers
                : <div>Waiting on {playersRemaining} players to select an answer.</div>
                )
          )}
      </Box>
    </StyledContainer>
  );
}
