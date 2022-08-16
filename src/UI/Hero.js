import { useState, useEffect } from "react";

import axios from "axios";
import AnimationCard from "./AnimationCard";

export default function Hero() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios("http://52.8.0.28:45000/cards/prompt")
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  //create an object of arrays that contain the cards for each deck with
  //the location of the card on the view and the body and also animation

  //   const cardsAnimate = cards.reduce((arr, card) => {
  //     return [
  //       ...arr,
  //       {
  //         body: card.body,
  //         top: Math.random() * 100,
  //         left: Math.random() * 100,
  //         animation: Math.floor(Math.random() * 10),
  //       },
  //     ];
  //   }, []);

  return (
    <div style={{ perspective: "800px" }}>
      {/* <Button color="primary">Hello</Button> */}
      {cards.slice(0, 20).map((card) => (
        <AnimationCard key={card.body} card={card} />
      ))}
    </div>
  );
}
