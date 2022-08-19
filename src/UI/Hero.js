import { useState, useEffect } from "react";
import axios from "axios";
import AnimationCard from "./AnimationCard";
import { Typography } from "@mui/material";

export default function Hero() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    console.log("fetching cards");
    axios("http://localhost:5050/cards/prompt?NSFW=true")
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      {/* <Button color="primary">Hello</Button> */}
      <Typography
        variant="p"
        component="h1"
        position="absolute"
        right="2%"
        top="20%"
        sx={{
          textTransform: "uppercase",
          fontSize: {
            xs: "2rem",
            sm: "3rem",
            md: "4rem",
            lg: "5rem",
          },
          fontWeight: "800",
          width: "10ch",
          height: "2ch",
          fontFamily: "sans-serif",
          color: "white",
          textShadow: "0 0 10px white",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            // outline: "solid 2px white",
            boxShadow: "0 1px 32px white",
            padding: "0.1em",
            textAlign: "center",
          }}
        >
          Apples
        </div>
        <div
          style={{
            display: "inline-block",
            textShadow: "0 0 10px white",
          }}
        >
          To
        </div>
        <div
          style={{
            textTransform: "uppercase",
            color: "orange",
            fontFamily: "sans-serif",
            textShadow: "0 0 10px white",
          }}
        >
          Oranges
        </div>
      </Typography>
      {cards.slice(0, 20).map((card, i) => (
        <AnimationCard key={card.body} card={card} i={i} />
      ))}
    </div>
  );
}
