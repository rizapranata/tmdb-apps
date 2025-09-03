import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { login } from "../../features/auth/authSlice";
import movieIcon from "../../assets/images/movie-icon.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, account, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if (isAuthenticated && account) {
      navigate("/");
    }
  }, [isAuthenticated, account, navigate]);

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  return (
    <div className="place-content-center min-h-screen bg-zinc-700">
      <div className="mx-auto content-center max-w-72 py-20 px-6 rounded-md bg-black flex flex-col gap-5">
        <div className="w-24 mx-auto pb-8">
          <img src={movieIcon} alt="movie-icon" />
        </div>
        <div className="">
          <p className="text-sm text-white ">Login to your account 🚀</p>
        </div>
        <input
          type="text"
          placeholder="username"
          value={username}
          className="px-2 py-1 rounded-md bg-zinc-600 text-white"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          className="px-2 py-1 rounded-md bg-zinc-600 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`p-1 mt-5 rounded-md bg-red-600 text-white ${
            loading || !username || !password
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={loading || !username || !password}
          onClick={handleLogin}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {error && (
          <p className="text-sm" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="mt-3">
          <button
            className="text-gray-400 text-sm"   
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
