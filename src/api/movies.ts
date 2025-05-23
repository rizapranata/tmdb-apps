import { createAsyncThunk } from "@reduxjs/toolkit";
import tmdbApi from "./tmdbApi";

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlaying",
  async (page: number, thunkApi) => {
    try {
      const response = await tmdbApi.get("/movie/now_playing", {
        params: {
          page: page,
        },
      });
      return {
        resutls: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
