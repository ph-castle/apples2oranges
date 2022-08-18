import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Hidden,
  Typography,
  keyframes,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { cardProps } from "./cardProps";
import { toggleAnimation } from "../app/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { rotateOut, rollIn, rollOut } from "./KeyFrames";

export default function AnimationCard({ card, i }) {
  const dispatch = useDispatch();
  const animatestate = useSelector((state) => state.main.animatestate);
  const isEven = i % 2 === 0;

  const AnimatedCard = styled(Card)(({ animatestate }) => ({
    transform: "rotate3d(1, 1, 1, -45deg) scale(1.5)",
    cursor: "pointer",
    display: "inline-block",
    animation: !animatestate
      ? "rotate-in-diag-1 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
      : `${rotateOut} 0.6s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`,
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
    fontWeight: "800",
    overflow: "hidden",
    textShadow: "0 0 10px white",
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
  }));
  // "translateY(0)"
  useEffect(() => {
    let timeout;
    if (animatestate === true) {
      // dispatch(toggleAnimation(false));
      timeout = setTimeout(() => {
        dispatch(toggleAnimation());
      }, 1000);
    }
    if (animatestate === false) {
      // dispatch(toggleAnimation(true));
      timeout = setTimeout(() => {
        dispatch(toggleAnimation(true));
      }, 50000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, animatestate]);
  return (
    <AnimatedCard
      animatestate={animatestate.toString()}
      onClick={() => dispatch(toggleAnimation())}
    >
      {/* <CardContent> */}
      <Typography
        variant="body2"
        sx={{
          padding: "1rem",
          fontFamily: "roboto",
          textShadow: `0 0 10px ${!isEven ? "black" : "white"}`,
          fontWeight: "800",
          fontSize: {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
            lg: "1rem",
          },
        }}
        color={!isEven ? "black" : "white"}
      >
        {card.body}
      </Typography>
      {/* </CardContent> */}
    </AnimatedCard>
  );
}
