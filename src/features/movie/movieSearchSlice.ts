import { fetchSearchMovies } from "../../api/movies";
import { MoviesItem } from "../../models/moviesModel";
import { createSlice } from "@reduxjs/toolkit";

interface MovieSearchState {
  movies: MoviesItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieSearchState = {
  movies: [] as MoviesItem[],
  loading: false,
  error: null,
};

const movieSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleQuerySearch: () => {
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSearchSlice.reducer;
