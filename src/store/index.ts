import { configureStore } from "@reduxjs/toolkit";
import topRatedReducer from "../features/movie/topRatedSlice";
import popularReducer from "../features/movie/popularSlice";
import nowPlayingReducer from "../features/movie/nowPlayingSlice";
import movieDetailReducer from "../features/movie/movieDetailSlice";

export const store = configureStore({
  reducer: {
    topRated: topRatedReducer,
    popular: popularReducer,
    movieDetail: movieDetailReducer,
    nowPlaying: nowPlayingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
