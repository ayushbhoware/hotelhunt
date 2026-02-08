import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorBends from "../ColorBlends";

const Login = () => {
  const navigate = useNavigate();

  const [form, setform] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = form.email.includes("@") && form.email.includes(".com");
    const hasNumber = form.pass.match(/[0-9]/);
    const hasSymbol = form.pass.match(/[@#$%^&*]/);
    const hasUpperCase = form.pass.match(/[A-Z]/);
    const hasLowerCase = form.pass.match(/[a-z]/);

    let valid = true;

    if (!cleanEmail) {
      alert("Please enter valid email");
      valid = false;
    } else if (!(hasNumber && hasSymbol && hasUpperCase && hasLowerCase)) {
      alert("Password must be strong");
      valid = false;
    }

    if (valid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const authUser = users.find(
        (u) => u.email === form.email && u.pass === form.pass
      );

      if (authUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(authUser));
        localStorage.setItem("useremail", authUser.email);
        alert("Login Successful");
        navigate("/home");
      } else {
        alert("Please enter valid email and password");
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Pure Black Base */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* ColorBends Animation */}
      <div className="absolute inset-0 z-10">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          autoRotate={0}
          color=""
        />
      </div>

      {/* Login Form */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="pass"
              value={form.pass}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
