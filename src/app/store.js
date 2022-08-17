/* eslint-disable import/extensions */
import { configureStore } from "@reduxjs/toolkit"; // creates a redux store
import mainReducer from "./mainSlice"; // the reducer

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export default store;
