import { MoviesItem } from "../../models/moviesModel";
import { createSlice } from "@reduxjs/toolkit";
import { fetchGenresMovie, fetchPopularMovies } from "../../api/movies";
import { Genre, GenreModel } from "../../models/movieGenreModel";

interface PopularState {
  popular: MoviesItem[];
  filteredPopular: MoviesItem[];
  activeTab: "popularity" | "releaseDate";
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
  page: number;
  genres: Genre[];
  total_pages: number;
}

const initialState: PopularState = {
  popular: [],
  filteredPopular: [],
  status: "idle",
  loading: false,
  error: null,
  page: 1,
  genres: [],
  total_pages: 0,
  activeTab: "popularity",
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

    setActiveTabAction: (state, action) => {
      state.activeTab = action.payload;
      if (state.activeTab === "popularity") {
        state.filteredPopular = state.popular.sort((a, b) =>
          b.popularity > a.popularity ? 1 : -1
        );
      } else {
        state.filteredPopular = state.popular.sort((a, b) =>
          b.release_date > a.release_date ? 1 : -1
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.popular =
          state.page === 1
            ? action.payload.results
            : [...state.popular, ...action.payload.results];
        state.page = action.payload.page;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to fetch popular movies";
      })
      .addCase(fetchGenresMovie.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchGenresMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.genres = action.payload.genres;
      })
      .addCase(fetchGenresMovie.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch genres movies";
      });
  },
});

export const { resetPopular, nextPage, setActiveTabAction } =
  popularSlice.actions;
export default popularSlice.reducer;
