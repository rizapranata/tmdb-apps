import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { login, logout } from "../../features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, account, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      dispatch(logout());
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome {account?.username}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} onClick={handleLogin}>
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
