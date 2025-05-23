import { fetchNowPlayingMovies } from "../../api/movies";
import { MoviesItem } from "../../models/moviesModel";
import { createSlice } from "@reduxjs/toolkit";

interface NowPlayingState {
  movies: MoviesItem[];
  page: number;
  total_pages: number;
  loading: boolean;
  error: string | null;
}

const initialState: NowPlayingState = {
  movies: [] as MoviesItem[],
  page: 1,
  total_pages: 0,
  loading: false,
  error: null,
};

const nowPlayingSlice = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.resutls;
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default nowPlayingSlice.reducer;
