import { MoviesItem } from "../../models/moviesModel";
import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../../api/movies";

interface PopularState {
  popular: MoviesItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PopularState = {
  popular: [],
  status: "idle",
  error: null,
};

const popularSlice = createSlice({
  name: "popular",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular = action.payload.results;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch popular movies";
      });
  },
});

export default popularSlice.reducer;