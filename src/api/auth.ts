import { createAsyncThunk } from "@reduxjs/toolkit";
import tmdbApi from "./tmdbApi";
import { Account } from "../models/accountModel";

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // 1. Create request_token
      const { data: tokenData } = await tmdbApi.get(
        "/authentication/token/new"
      );

      // 2. Validate with login
      await tmdbApi.post("/authentication/token/validate_with_login", {
        username,
        password,
        request_token: tokenData.request_token,
      });

      // 3. Create session
      const { data: sessionData } = await tmdbApi.post(
        "/authentication/session/new",
        {
          request_token: tokenData.request_token,
        }
      );

      const sessionId = sessionData.session_id;
      localStorage.setItem("session_id", sessionId);

      // 4. Get account info
      const { data: accountData } = await tmdbApi.get("/account", {
        params: { session_id: sessionId },
      });

      return {
        sessionId,
        account: accountData as Account,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.status_message || "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      await tmdbApi.delete("/authentication/session", {
        data: { session_id: sessionId },
      });
      return true;
    } catch (error: any) {
      return rejectWithValue("Logout failed");
    }
  }
);