import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center mb-3">Register</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            className="form-control my-2"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            className="form-control my-2"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            className="form-control my-2"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="form-control my-2"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}

        <p className="mt-4 text-center mb-1">Already have an account?</p>
        <div className="d-grid gap-2">
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
