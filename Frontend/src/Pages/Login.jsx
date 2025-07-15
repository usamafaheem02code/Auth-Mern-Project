import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successToast = (msg) => toast.success(msg);
const failedToast = (msg) => toast.error(msg);

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      failedToast("Email and Password are required");
      return;
    }

    if (password.length < 4) {
      failedToast("Password must be at least 4 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Backend Response:", result);

      if (result.success) {
        successToast(result.message);
        localStorage.setItem("token", result.token);  // <-- Must be 'token' key same as backend
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        failedToast(result.message || "Login failed");
      }
    } catch (err) {
      failedToast("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50">
      <div
        className="container w-full max-w-[370px] px-10 py-20 flex flex-col items-center rounded-xl  shadow-lg"
      style={{
          boxShadow: "2px 2px 5px 5px rgba(66,66,69,1)",
        }}
      >
        <h1 className="font-bold text-3xl mb-7 tracking-wide">Log In</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col mb-3">
            <label className="text-lg tracking-wider font-semibold">Email</label>
            <input
              className="border-b-2 border-purple-900 pb-1 focus:outline-none placeholder:italic"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-lg tracking-wider font-semibold">Password</label>
            <input
              className="border-b-2 border-purple-900 pb-1 focus:outline-none placeholder:italic"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 rounded-md p-2 font-semibold text-white my-2"
          >
            Log In
          </button>
          <span className="text-sm">
            Don't have an account?
            <Link className="text-purple-700 px-1 underline" to="/signup">
              Sign Up
            </Link>
          </span>
        </form>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Login;
