import React from "react";
import { Card, CardContent, Hidden, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { cardProps } from "./cardProps";
// const Item = styled(Paper)`
//   text-align: center;
//   height: 10rem;
//   width: 100%;
//   max-width: 16rems;
//   line-height: 10rem;
// `;

export default function AnimationCard({ card, i }) {
  const [animationToggle, setAnimationToggle] = React.useState(false);
  const isEven = i % 2 === 0;
  const AnimatedCard = styled(Card)({
    transform: "rotate3d(1, 1, 1, -45deg) scale(1.5)",
    display: "inline-block",
    animation:
      "rotate-in-diag-1 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
    position: "absolute",
    top: `${cardProps[i].top}%`,
    left: `${cardProps[i].left}%`,
    width: "25%",
    maxWidth: "12rem",
    height: "40%",
    maxHeight: "16rem",
    outline: `solid 2px ${!isEven ? "black" : "white"}`,
    zIndex: "-1",
    backgroundColor: isEven ? "black" : "white",
    color: !isEven ? "black" : "white",
    fontSize: "32px",
    fontWeight: "800",
    overflow: "hidden",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
    "@keyframes rotate-in-diag-1": {
      "0%": {
        // "-webkit-transform": "rotate3d(1, 1, 0, -360deg)",
        transform: "rotate3d(1, 1, 0, -360deg)",
        opacity: "0",
      },
      "50%": {
        // "-webkit-transform": "rotate3d(1, 1, 0, 0deg)",
        transform: "rotate3d(1, 1, 0, 0deg)",
        opacity: "1",
      },
      "100%": {
        // "-webkit-transform": "rotate3d(1, 1, 0, 0deg)",
        transform: "rotate3d(1, 1, 1, -45deg) scale(1.5)",
      },
    },
  });
  // "translateY(0)"
  return (
    <AnimatedCard>
      <CardContent>
        <Typography variant="body2">{card.body}</Typography>
      </CardContent>
    </AnimatedCard>
  );
}
