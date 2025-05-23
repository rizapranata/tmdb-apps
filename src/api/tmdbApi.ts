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
  async (config) => {
    // const token = await AsyncStorage.getItem('token'); // React Native
    // const token = localStorage.getItem("token"); // React Web
    const token = `${configEnv.access_token}`; // React Web

    config.params = {
      ...(config.params || {}),
      api_key: `${configEnv.api_key}`,
    };

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("api error", error);
    return Promise.reject(error);
  }
);

export default tmdbApi;
