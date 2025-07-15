import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { failedToast, successToast } from "../utility";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      failedToast("Name, email or password is required");
      return;
    }

    if (name.length < 4) {
      failedToast("Name must be at least 4 characters");
      return;
    }

    if (password.length < 4) {
      failedToast("Password must be at least 4 characters");
      return;
    }

    try {
      const url = "https://auth-backend-api-xq05.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        successToast("Successfully signed up");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setFormData({ name: "", email: "", password: "" });
      } else if (error) {
        const details = error?.details?.[0]?.message || "Validation error";
        failedToast(details);
      } else {
        failedToast(message || "Signup failed");
      }
    } catch (error) {
      failedToast("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-gray-700 font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-medium hover:underline">
            Log In
          </Link>
        </p>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Signup;
