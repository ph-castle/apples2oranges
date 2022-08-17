import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchID: "",
  playerID: "",
  playerCredentials: "",
  spotifyToken: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setMatchID: (state, action) => {
      state.matchID = action.payload;
    },
    setPlayerID: (state, action) => {
      state.playerID = action.payload;
    },
    setPlayerCredentials: (state, action) => {
      state.playerCredentials = action.payload;
    },
    setSpotifyToken: (state, action) => {
      state.spotifyToken = action.payload;
    },
  },
});

export const {
  setMatchID,
  setPlayerID,
  setPlayerCredentials,
  setSpotifyToken,
} = mainSlice.actions;

export default mainSlice.reducer;
