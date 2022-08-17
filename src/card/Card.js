import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import {
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
  RedditShareButton, RedditIcon,
} from "react-share";

// Card will be a card that is moveable within it's container
// Player Hand / Judge Hand
export default class Card extends React.Component {

  // Allows the item to be dragged
  drag = (e) => {
    // 'transfer' here must match data const in Droppable area
    e.dataTransfer.setData('transfer', e.target.id)
  }

  // Prevents the card from being droppable inside another card
  noAllowDrop = (e) => {
    // Without this, you could nest cards inside of each other
    e.stopPropagation();
  }

  render() {
    const shareTitle = 'Apples to Oranges!';
    const shareMessage = `I'm playing Apples to Oranges and found this hilarious!\n${this.props.children}`;
    const url = String(window.location);

    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
        className={styles.answer_card}
      >
        <div className={styles.card_text}>
          {this.props.children} {/* children is the card text*/}
        </div>
        <button className={styles.select_button}>Select</button>
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
    )
  }
};

Card.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

/*

  .facebook {
    background: #4267B2;
  }

  .twitter {
    background: #00acee;
  }

  .pinterest {
    background: #E60023;
  }

  return (
    <Container>
      <ButtonContainer>
        <div
          className="fb-share-button"
          data-href={urlToShare}
          data-layout="button"
          style={{ color: 'rgba(0, 0, 0, 0)' }}
        >
          Share on Facebook
        </div>
      </ButtonContainer>
      <ButtonContainer>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${tweetEncoded}&url=${urlToShare}`}
          style={{ color: 'rgba(0, 0, 0, 0)' }}
        >
          Tweet
        </a>
      </ButtonContainer>
      <ButtonContainer>
        <a
          data-pin-do="buttonBookmark"
          href="https://www.pinterest.com/pin/create/button/"
          style={{ color: 'rgba(0, 0, 0, 0)' }}
        >
          Save to Pinterest
        </a>
      </ButtonContainer>
    </Container>
  );
}
*/
