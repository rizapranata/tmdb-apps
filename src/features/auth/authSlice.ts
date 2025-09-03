// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import tmdbApi from "../../api/tmdbApi";

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

// 🔥 Restore state dari localStorage
const storedSession = localStorage.getItem("session_id");
const storedAccount = localStorage.getItem("account");

const initialState: AuthState = {
  isAuthenticated: !!storedSession,
  sessionId: storedSession || null,
  account: storedAccount ? JSON.parse(storedAccount) : null,
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
      // 🧹 bersihkan localStorage juga
      localStorage.removeItem("session_id");
      localStorage.removeItem("account");
    },
  },
  extraReducers: (builder) => {
    // 🔐 Login
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

        // simpan ke localStorage
        localStorage.setItem("session_id", action.payload.sessionId);
        localStorage.setItem("account", JSON.stringify(action.payload.account));
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });

    // 🚪 Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.sessionId = null;
      state.account = null;
      state.loading = false;
      state.error = null;
      // bersihkan localStorage
      localStorage.removeItem("session_id");
      localStorage.removeItem("account");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
