import { createSlice } from "@reduxjs/toolkit";

interface TopRatedState {}

const initialState: TopRatedState = {};

const topRatedSlice = createSlice({
  name: "topRated",
  initialState,
  reducers: {
    // Define your reducers here
    setTopRated: (state, action) => {
      // Logic to set top rated movies
    },
    clearTopRated: (state) => {
      // Logic to clear top rated movies
    },
  },
})

export default topRatedSlice.reducer;