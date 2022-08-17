import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchID: "",
  playerID: "",
  playerCredentials: "",
  room: "",
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
    setRoom: (state, action) => {
      state.room = action.payload;
    }
  },
});

export const { setMatchID, setPlayerID, setPlayerCredentials, setRoom } = mainSlice.actions;
export default mainSlice.reducer;
