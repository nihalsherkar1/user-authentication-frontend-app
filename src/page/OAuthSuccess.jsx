// src/pages/OAuthSuccess.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAuthenticated,
  setCredentials,
  setOAuth,
} from "../features/login/loginSlice";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/token", {
        withCredentials: true, // Important for session cookie
      })
      .then((res) => {
        console.log("OAuth backend response:", res.data.user);
        const { token, user } = res.data;
        console.log("Res: ", res.data.user);
        // save to redux

        dispatch(setOAuth(res.data.user));
        dispatch(setCredentials({ user, token }));
        sessionStorage.setItem("token", token); // Store token in session storage
        sessionStorage.setItem("role", res.data.user.role);
        dispatch(setAuthenticated(true));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Failed to fetch token", err);
        navigate("/");
      });
  }, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen text-xl">
      Logging in...
    </div>
  );
}
