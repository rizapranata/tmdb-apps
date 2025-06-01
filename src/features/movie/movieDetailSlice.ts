import { createSlice } from "@reduxjs/toolkit";
import { MovieCredit } from "../../models/movieCreditModel";
import { Review } from "../../models/movieReviewModel";
import { MovieDetail } from "../../models/movieDetailModel";
import {
  fetchCreditsMovie,
  fetchDetailMovie,
  fetchReviewsMovie,
} from "../../api/movies";

interface MovieDetailState {
  movieDetail: MovieDetail;
  movieReviews: Review[];
  movieCredit: MovieCredit;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  movieDetail: {} as MovieDetail,
  movieReviews: [] as Review[],
  movieCredit: {
    id: 0,
    cast: [],
    crew: [],
  },
  loading: false,
  error: null,
};

const movieSearchSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailMovie.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchDetailMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchReviewsMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsMovie.fulfilled, (state, action) => {
        state.movieReviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewsMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchCreditsMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditsMovie.fulfilled, (state, action) => {
        state.movieCredit = action.payload;
        state.loading = false;
      })
      .addCase(fetchCreditsMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default movieSearchSlice.reducer;