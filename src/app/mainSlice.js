import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchID: "",
  playerID: "",
  playerCredentials: "",
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
    }
  },
});

export const { setMatchID, setPlayerID, setPlayerCredentials } = mainSlice.actions;
export default mainSlice.reducer;
