// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout } from "../../api/auth";
import { Account } from "../../models/accountModel";
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
