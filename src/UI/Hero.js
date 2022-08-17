import { useState, useEffect } from "react";
import axios from "axios";
import AnimationCard from "./AnimationCard";
import { Typography } from "@mui/material";

export default function Hero() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    console.log("fetching cards");
    axios("http://13.57.223.4:45000/cards/prompt")
      .then((res) => {
        console.log("res");
        setCards(res.data);
      })
      .catch((err) => console.log(err.message));
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
          color: "red",
          textShadow: "0 0 10px white",
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
        To{" "}
        <Typography
          color="orange"
          sx={{
            textTransform: "uppercase",
            fontSize: "6rem",
            fontWeight: "800",
            // width: "10ch",
            // height: "2ch",
            fontFamily: "sans-serif",
            textShadow: "0 0 10px white",
          }}
        >
          Oranges
        </Typography>
      </Typography>
      {cards.slice(0, 20).map((card, i) => (
        <AnimationCard key={card.body} card={card} i={i} />
      ))}
    </div>
  );
}
