import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  album: '',
  play: false,
  tab: 0,
  image: '',
  url: '',
  isMusicPlayerOpen: false,
};

export const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    selectAlbum: (state, action) => {
      state.album = action.payload;
    },
    setPlay: (state, action) => {
      state.play = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setIsMusicPlayerOpen: (state, action) => {
      state.isMusicPlayerOpen = action.type || true;
    },
  },
});

export const {
  setToken,
  selectAlbum,
  setPlay,
  setTab,
  setImage,
  setUrl,
  setIsMusicPlayerOpen,
} = spotifySlice.actions;

export default spotifySlice.reducer;
