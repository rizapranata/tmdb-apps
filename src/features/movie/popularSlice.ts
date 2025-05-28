import { MoviesItem } from "../../models/moviesModel";
import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../../api/movies";

interface PopularState {
  popular: MoviesItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  total_pages: number;
}

const initialState: PopularState = {
  popular: [],
  status: "idle",
  error: null,
  page: 1,
  total_pages: 0,
};

const popularSlice = createSlice({
  name: "popular",
  initialState: initialState,
  reducers: {
    resetPopular: (state) => {
      state.popular = [];
      state.status = "idle";
      state.error = null;
      state.page = 1;
      state.total_pages = 0;
    },
    nextPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular =
          state.page === 1
            ? action.payload.results
            : [...state.popular, ...action.payload.results];
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch popular movies";
      });
  },
});

export const { resetPopular, nextPage } = popularSlice.actions;
export default popularSlice.reducer;
