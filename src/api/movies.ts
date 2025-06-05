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

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (page: number, thunkApi) => {
    try {
      const response = await tmdbApi.get("/movie/popular", {
        params: {
          page: page,
        },
      });
      return {
        results: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDetailMovie = createAsyncThunk(
  "/movie/:id",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/movie/${id}`, {
        params: {
          language: "en-US",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetch",
  async (query: string, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/search/movie`, {
        params: {
          query,
        },
      });
      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsMovie = createAsyncThunk(
  "reviews/movie",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/movie/${id}/reviews`, {
        params: {
          language: "en-US",
        },
      });
      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreditsMovie = createAsyncThunk(
  "credits/movie",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/movie/${id}/credits`, {
        params: {
          language: "en-US",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchVideosMovie = createAsyncThunk(
  "video/movie",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`movie/${id}/videos`, {
        params: {
          id,
        },
      });
      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
