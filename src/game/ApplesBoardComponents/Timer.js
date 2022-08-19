import React, { useState, useEffect } from 'react';

export default function Timer({ roundTime, setRoundTime }) {
  // const [seconds, setSeconds ] =  useState(time);

  useEffect(() => {
    let interval = setInterval(() => {
      if (roundTime > 0) {
        setRoundTime((prevRoundTime) => prevRoundTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  if (!roundTime) {
    return null;
  }
  return (
    <div>{roundTime === 0 ? null : <h1>Time Remaining: {roundTime}</h1>}</div>
  );
}
