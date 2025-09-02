// src/services/tmdbApi.ts
import axios from "axios";
import { configEnv } from "../config";

const tmdbApi = axios.create({
  baseURL: `${configEnv.api_host}`,
  headers: {
    "Content-Type": "application/json",
  },
});

tmdbApi.interceptors.request.use(
  (config) => {
    const token = configEnv.access_token; // Bearer Token TMDB
    const sessionId = localStorage.getItem("session_id"); // Ambil dari storage

    config.params = {
      ...(config.params || {}),
      api_key: `${configEnv.api_key}`,
      ...(sessionId ? { session_id: sessionId } : {}),
    };

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default tmdbApi;
