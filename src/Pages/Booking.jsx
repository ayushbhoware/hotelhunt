import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;

  const currentEmail = localStorage.getItem("useremail");
  if (!currentEmail) return <Navigate to="/login" />;

  const [form, setForm] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: currentEmail,
    countryCode: "+91",
    phone: "",
    gstDetails: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:3000/booking-data", {
        ...form,
        hotelId: hotel.id,
        hotelName: hotel.name,
        loggedUser: currentEmail,
      });

      navigate("/my-bookings");
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in"
      >
        {/* Hotel Info */}
        {hotel && (
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl p-5">
            <h3 className="text-2xl font-semibold">{hotel.name}</h3>
            <p className="opacity-90">{hotel.location}</p>
            <p className="mt-1 font-medium">
              ₹{hotel.price.toLocaleString()} + taxes
            </p>
          </div>
        )}

        <h2 className="text-lg font-semibold text-gray-800">Guest Details</h2>

        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <select
            name="title"
            value={form.title}
            onChange={handleChange}
            className="md:col-span-3 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
          >
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Dr</option>
          </select>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="md:col-span-4 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="md:col-span-5 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            readOnly
            className="w-full mt-1 border rounded-xl p-3 bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Booking confirmation will be sent here
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Mobile Number</label>
          <div className="flex gap-2 mt-1">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              <option value="+91">+91 India</option>
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="flex-1 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* GST */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="gstDetails"
            checked={form.gstDetails}
            onChange={handleChange}
          />
          <span className="text-sm font-medium">
            Enter GST details (optional)
          </span>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
