import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );
        setMessage(res.data.message);
        setTimeout(() => navigate("/login"), 3000); // redirect after 3 sec
      } catch (err) {
        setMessage("Verification failed. Invalid or expired token.");
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="container mt-5 text-center">
      <h3>{message}</h3>
    </div>
  );
};

export default VerifyEmail;
