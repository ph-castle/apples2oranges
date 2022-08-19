import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matchID: '',
  playerID: '',
  playerCredentials: '',
  animatestate: false,
};

export const mainSlice = createSlice({
  name: 'main',
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
    toggleAnimation: (state, action) => {
      state.animatestate = action.payload
        ? action.payload
        : !state.animatestate;
    },
  },
});

export const {
  setMatchID,
  setPlayerID,
  setPlayerCredentials,
  toggleAnimation,
} = mainSlice.actions;

export default mainSlice.reducer;
