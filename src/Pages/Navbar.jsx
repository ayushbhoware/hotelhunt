import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const navigate = useNavigate();

  // Listen to storage changes (for multiple tabs or reactive update)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Call this after login
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({ name: "John" }));
    setIsLoggedIn(true); // immediately update state
    navigate("/booking");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false); // update state to rerender Navbar
    navigate("/login"); // navigate programmatically
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow">
      <h1 className="text-2xl font-bold text-blue-600">HotelHunt</h1>
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to={"/home"} className="cursor-pointer hover:text-blue-600">
          Home
        </Link>
        <Link to={"/hotels"} className="cursor-pointer hover:text-blue-600">
          Hotels
        </Link>
        <Link to={"/contact"} className="cursor-pointer hover:text-blue-600">
          Contact
        </Link>
        <Link to={"/booking"} className="cursor-pointer hover:text-blue-600">
          Booking
        </Link>
        {!isLoggedIn ? (
          <>
            <Link to={"/signup"} className="cursor-pointer hover:text-blue-600">
              Signup
            </Link>
            <button
              onClick={handleLogin}
              className="cursor-pointer hover:text-blue-600"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
