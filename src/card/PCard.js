import React from 'react';
import styles from './Card.module.css';

export default function Card(props) {
  return (
    <div
      id={props.id}
      draggable="true"
      className={styles.prompt_card}
    >
      <div className={styles.prompt_card_text}>
        {props.children}
      </div>
    </div>
  );
};
