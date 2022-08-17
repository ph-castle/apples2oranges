import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css'

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
      </div>
    )
  }
};

Card.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
