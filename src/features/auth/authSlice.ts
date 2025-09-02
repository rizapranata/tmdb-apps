// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import tmdbApi from "../../api/tmdbApi";

const savedSessionId = localStorage.getItem("session_id");

// Types
interface Account {
  id: number;
  username: string;
  name: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
}

interface AuthState {
  isAuthenticated: boolean;
  sessionId: string | null;
  account: Account | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  sessionId: savedSessionId || null,
  account: null,
  loading: false,
  error: null,
};

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

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("session_id");
  return { sessionId: null, accountId: null };
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.sessionId = null;
      state.account = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<{ sessionId: string; account: Account }>
      ) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.sessionId = action.payload.sessionId;
        state.account = action.payload.account;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.sessionId = null;
      state.account = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
