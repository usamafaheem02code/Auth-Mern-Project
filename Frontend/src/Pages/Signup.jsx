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
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("login info -->", formData);

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
    const url = "http://localhost:8000/auth/signup";
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
        navigate("../login");
      }, 1000);
      setFormData({ name: "", email: "", password: "" });
    } else if (error) {
      const details = error?.details[0]?.message || "Validation error";
      failedToast(details);
    } else {
      failedToast(message || "Signup failed");
    }
  } catch (error) {
    failedToast("Something went wrong. Try again.");
  }
};


  return (
    <div className=" w-[100%] h-[100vh] flex items-center justify-center bg-blue-50">
      <div
        className="container bg-[rgb(255,255,255,0.1)] w-[100%] max-w-[370px] px-10 py-20 flex flex-col items-center rounded-xl "
        style={{
          boxShadow: "2px 2px 5px 5px rgba(66,66,69,1)",
        }}
      >
        <h1 className=" font-bold text-3xl mb-7 tracking-wide">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label
              htmlFor="name"
              className="text-lg tracking-wider font-semibold "
            >
              Name
            </label>
            <input
              onChange={handleChange}
              className="border-b-[2px] border-purple-900 pb-1 focus:outline-none placeholder:text-md  placeholder:text-black placeholder:italic"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter you name"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-lg tracking-wider font-semibold ">
              Email
            </label>
            <input
              onChange={handleChange}
              className="border-b-[2px] border-purple-900 pb-1 focus:outline-none placeholder:text-md  placeholder:text-black placeholder:italic"
              name="email"
              value={formData.email}
              type="email"
              placeholder="Enter you email"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-lg tracking-wider font-semibold ">
              Password
            </label>
            <input
              onChange={handleChange}
              className="border-b-[2px] border-purple-900 pb-1 focus:outline-none placeholder:text-md  placeholder:text-black placeholder:italic"
              name="password"
              value={formData.password}
              type="password"
              placeholder="Enter you password"
            />
          </div>
          <button
            type="submit"
            className="w-[100%] bg-purple-600 rounded-md p-1 font-[500] my-2 text-white"
          >
            Sign Up
          </button>
          <span>
            User already have a account?
            <Link className="text-purple-700 px-1 underline" to="/login">
              Login{" "}
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
