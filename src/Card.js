import React from "react";

// Basic card placeholder
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="answer-card" draggable="true">
        <p className="card-text">
          This is a very long sentence to see how the text fits
          in a card without overflowing to the sides.
          Any longer than this and it will need to be scrolled.
        </p>

        <button className="select-button"> Select </button>
      </div>
    )
  }
};

export default Card;
