import React from 'react';
import styles from './Card.module.css';
import {
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
  RedditShareButton, RedditIcon,
} from "react-share";

export default function Card(props) {

  const handleSelect = (e) => {
    e.preventDefault();
    if (props.player) {
      props.moves.playAnswer(props.playerId);
    } else {
      props.moves.pickWinner(props.playerId);
    }
  };

    const shareTitle = 'Apples to Oranges!';
    const shareMessage = `I'm playing Apples to Oranges and found this hilarious!\n${props.text}`;
    const url = String(window.location);

  return (
    <div
      id={props.id}
      draggable="true"
      className={styles.answer_card}
    >
      <div className={styles.card_text}>
        {props.text}
      </div>
      {props.showAnswers
      ? <div/>
      : <button className={styles.select_button} onClick={(e) => handleSelect(e)}>
          Select
        </button>}

      <div className={styles.social_media}>
        <TwitterShareButton url={url} title={shareTitle} via={shareMessage}>
          <TwitterIcon size="1.3em" round/>
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={shareMessage}>
          <FacebookIcon size="1.3em" round/>
        </FacebookShareButton>
        <RedditShareButton url={url} title={shareMessage}>
          <RedditIcon size="1.3em" round/>
        </RedditShareButton>
      </div>

    </div>
  );
};
