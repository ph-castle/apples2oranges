import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// const Item = styled(Paper)`
//   text-align: center;
//   height: 10rem;
//   width: 100%;
//   max-width: 16rems;
//   line-height: 10rem;
// `;

export default function AnimationCard({ card }) {
  const AnimatedCard = styled(Card)({
    animation: "rotate-scale-up .65s linear both",
    position: "absolute",
    bottom: `${Math.random() * 800}px`,
    right: `-${Math.random() * 800}px`,
    width: "10rem",
    height: "12rem",
    zIndex: "-1",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
    transform: "translate(-50%, -50%)",

    "@keyframes rotate-scale-up": {
      "0%": {
        transform: "rotate(0deg) scale(1)",
      },
      "100%": {
        // transform: "rotate(360deg) scale(1.5)",
        transform: "rotate3d(1, 1, 1, 45deg)",
        top: card.top,
        left: card.left,
      },
    },
  });
  return (dd .
    g
    <AnimatedCard key={card.body}>
      <CardContent>
        <Typography variant="body2">{card.body}</Typography>
      </CardContent>
    </AnimatedCard>
  );
}
