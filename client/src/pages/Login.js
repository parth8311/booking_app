import React, { useState } from "react";
import API from "../api";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      dispatch(setLogin(res.data));
      navigate("/booking");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center mb-3">Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            className="form-control my-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control my-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-success" type="submit">
              Login
            </button>
          </div>
        </form>

        {message && <div className="alert alert-danger mt-3">{message}</div>}

        {/* Register Prompt */}
        <p className="text-center mt-4 mb-2">Don’t have an account?</p>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
