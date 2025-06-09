import { fetchSearchMovies } from "../../api/movies";
import { MoviesItem } from "../../models/moviesModel";
import { createSlice } from "@reduxjs/toolkit";

interface MovieSearchState {
  movies: MoviesItem[];
  page: number;
  query: string;
  total_pages: number;
  loading: boolean;
  error: string | null;
}

const initialState: MovieSearchState = {
  movies: [] as MoviesItem[],
  page: 1,
  query: "",
  total_pages: 0,
  loading: false,
  error: null,
};

const movieSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
    },
    nextPage: (state) => {
      state.page += 1;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies =
          state.page === 1
            ? action.payload.results
            : [...state.movies, ...action.payload.results];
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMovies, nextPage, setQuery, setPage } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
