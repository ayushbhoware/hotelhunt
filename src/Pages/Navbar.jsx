import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/10">
      <div className="flex justify-between items-center px-10 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          HotelHunt
        </h1>

        {/* Links */}
        <div className="flex items-center gap-8 text-gray-300 font-medium">
          {[
            { name: "Home", path: "/home" },
            { name: "Hotels", path: "/hotels" },
            { name: "Booking", path: "/booking" },
          ].map((item) => (
            <Link key={item.name} to={item.path} className="relative group">
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="relative group">
                Signup
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/login"
                className="px-4 py-1.5 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:scale-105 transition-transform duration-300"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
