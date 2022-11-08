import React, { useEffect, useState} from "react";
import { ApplesClient } from "./utils/ApplesClient";

export const Apples2Oranges = () => {
  return (
    <ApplesClient
      matchID={localStorage.getItem("matchID")}
      playerID={localStorage.getItem("id")}
      credentials={localStorage.getItem("credentials")}
    />
  );
};

