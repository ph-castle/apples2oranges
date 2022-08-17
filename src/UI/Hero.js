import { useState, useEffect } from "react";

import axios from "axios";
import AnimationCard from "./AnimationCard";
import { Typography } from "@mui/material";

export default function Hero() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    console.log("fetching cards");
    axios("http://54.177.127.149:45000/cards/prompt")
      .then((res) => {
        console.log("res");
        setCards(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  //create an object of arrays that contain the cards for each deck with
  //the location of the card on the view and the body and also animation

  const cardsAnimate = cards.reduce((arr, card) => {
    return [
      ...arr,
      {
        body: card.body,
        top: -Math.random() * 300,
        left: Math.random() * 300,
        animation: Math.floor(Math.random() * 10),
      },
    ];
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* <Button color="primary">Hello</Button> */}
      <Typography
        variant="p"
        component="h1"
        position="absolute"
        right="20px"
        top="200px"
        style={{
          textTransform: "uppercase",
          fontSize: "6rem",
          fontWeight: "800",
          width: "10ch",
          height: "2ch",
          fontFamily: "sans-serif",
          color: "white",
          // outline: "solid 2px white",/
        }}
      >
        <div
          style={{
            outline: "solid 2px white",
            display: "inline-block",
            padding: "0.1em",
          }}
        >
          Apples
        </div>{" "}
        To Oranges
      </Typography>
      {cardsAnimate.slice(0, 20).map((card, i) => (
        <AnimationCard key={card.body} card={card} i={i} />
      ))}
    </div>
  );
}
