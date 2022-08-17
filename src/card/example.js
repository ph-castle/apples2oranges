import React from 'react';
import Card from './Card';
import Hand from './Hand';
import styles from './Hand.module.css'

// Demo I've been using to show DnD areas
export default class DndTest extends React.Component {
  render() {
    return (
      <div className={styles.board_area}>

        <Hand className={styles.player_hand}>

          <Card id="item1">
              Not vaccinating my children because I am stupid.
          </Card>

          <Card id="item2">
              Rubbing Boris Johnson's belly until he falls asleep.
          </Card>

          <Card id="item3">
              Sorry, this content cannot be viewed in your region.
          </Card>

          <Card id="item4">
              Sorry, this content cannot be viewed in MY region.
          </Card>

          <Card id="item5">
              Hurling one's body down a hill in pursuit of a wheel of cheese.
          </Card>

        </Hand>



        <Hand className={styles.judge_hand}>

          <Card id="item6">
              Hurling one's body down a hill in pursuit of Alduin's sweet roll.
          </Card>

          <Card id="item7">
              Hurling one's body down a hill in pursuit of Serana's sweet roll.
          </Card>

        </Hand>


      </div>
    )
  }
};
