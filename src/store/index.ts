import { configureStore } from "@reduxjs/toolkit";
import topRatedReducer from "../features/movie/topRatedSlice";
import nowPlayingReducer from "../features/movie/nowPlayingSlice";

export const store = configureStore({
  reducer: {
    topRated: topRatedReducer,
    nowPlaying: nowPlayingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;