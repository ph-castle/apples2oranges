import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

export default class Card extends React.Component {
  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        className={styles.prompt_card}
      >
        <div className={styles.prompt_card_text}>
          {this.props.children}
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
