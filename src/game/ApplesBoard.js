import React from "react";
import JudgeView from "./ApplesBoardComponents/JudgeView";
import PlayerView from "./ApplesBoardComponents/PlayerView";
import { useNavigate } from "react-router-dom";
import { lobbyClient } from '../features/utils/lobbyClient';


export function ApplesBoard({ ctx, G, moves, playerID, sendChatMessage, chatMessages, matchData }) {
  let navigate = useNavigate();
  //create two different views that will be returned depending on if player is judge or not

  //define functions that affect how the board elements are displayed

  //define board elements on when win condition is met
  let winner = "";
  if (ctx.gameover) {
    let nextGameParams = {
      playerID: localStorage.getItem("id"),
      credentials: localStorage.getItem("credentials")
      // defaults numPlayers and setupData to previous game
    };
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">
          Winner: {ctx.gameover.winner}
          <button onClick={() => {
            lobbyClient
              .playAgain("Apples2Oranges", localStorage.getItem("matchID"), nextGameParams)
              .then((results) => {
                localStorage.setItem("matchID", results.nextMatchID);
                navigate(`/waitingroom/${results.nextMatchID}`);
              })
              .catch((err) => {
                console.log('Error creating next game: ', err);
              });
          }}>
            Play Again
          </button>
          <button onClick={() => {
            navigate('/home');
          }}
          >
            Back to Home
          </button>
        </div>
      ) : null;
  }

  //board elements will change based on phase, stage, and if it is players turn to be judge

  return (
    <div className="Game">
      <div className="View">
        {/* change board view IF player is the current Judge */}
        {ctx.currentPlayer === playerID ? (
          <JudgeView
            G={G}
            ctx={ctx}
            moves={moves}
            sendChatMessage={sendChatMessage}
            chatMessages={chatMessages}
            matchData={matchData}
          />
        ) : (
          <PlayerView
            G={G}
            ctx={ctx}
            moves={moves}
            playerID={playerID}
            sendChatMessage={sendChatMessage}
            chatMessages={chatMessages}
            matchData={matchData}
          />
        )}
      </div>
      {winner}
    </div>
  );
}