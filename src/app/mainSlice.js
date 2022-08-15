import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchID: "",
  playerID: "",
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
  },
});

export const { setMatchID, setPlayerID } = mainSlice.actions;
export default mainSlice.reducer;
