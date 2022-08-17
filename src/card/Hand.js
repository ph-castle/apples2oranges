import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hand.module.css'

// Hand is the containers that we can drag and drop between
// Analogous to JudgeView / PlayerView in A2O ?
export default class Hand extends React.Component {

  // Allows items to be dropped into it
  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    // console.log("ID --> ", data); // --------LOG's the ID
    e.target.appendChild(document.getElementById(data));
  }

  // Allows the item to be dropped into this container
  allowDrop = (e) => {
    e.preventDefault();
  }

  // Hand and judge hand are the only draggable and droppable areas
  render() {
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        style={this.props.style}
        className={styles.judge_hand}
      >
        {this.props.children}   {/* children is the card AND text*/}
      </div>
    )
  }
};

Hand.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}
