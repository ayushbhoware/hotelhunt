import React, { useState } from "react";
import ColorBends from "../ColorBlends";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    email: "",
    number: "",
    pass: "",
    cpass: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (form.name.trim() === "") {
      alert("Please enter name");
      valid = false;
    } else if (isNaN(form.number)) {
      alert("Please enter number only");
      valid = false;
    } else if (form.pass !== form.cpass) {
      alert("Password & Confirm Password must match");
      valid = false;
    }

    if (valid) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      let alreadyuser = users.find((u) => u.email === form.email);

      if (alreadyuser) {
        alert("Already a user");
        return;
      }

      users.push(form);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
      alert("Signup Success 🎉");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Black Base */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Background Animation */}
      <div className="absolute inset-0 z-10">
        <ColorBends
          colors={["#00ffd1", "#8a5cff", "#ff5c7a"]}
          speed={0.25}
          frequency={1}
          warpStrength={1}
          noise={0.15}
          transparent
        />
      </div>

      {/* Signup Card */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 animate-fadeIn"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Number */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-1 block">
              Mobile Number
            </label>
            <input
              type="text"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Enter your number"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              type="password"
              name="pass"
              value={form.pass}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpass"
              value={form.cpass}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>

          <p className="text-gray-400 text-sm text-center mt-5">
            Already have an account?{" "}
            <span className="text-cyan-400 cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
