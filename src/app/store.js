/* eslint-disable import/extensions */
import { configureStore } from '@reduxjs/toolkit'; // creates a redux store
import mainReducer from './mainSlice'; // the reducer
import spotifyReducer from './spotifySlice'; // the reducer

const store = configureStore({
  reducer: {
    main: mainReducer,
    spotify: spotifyReducer,
  },
});

export default store;
