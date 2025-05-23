import { configureStore } from "@reduxjs/toolkit";
import topRatedReducer from "../features/movie/topRatedSlice";

export const store = configureStore({
  reducer: {
    topRated: topRatedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;