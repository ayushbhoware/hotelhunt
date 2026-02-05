import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel; // hotel data passed from Hotels page

  const currentEmail = localStorage.getItem("useremail");

  // Redirect to login if user not logged in
  if (!currentEmail) {
    return <Navigate to="/login" />;
  }

  const [form, setForm] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: currentEmail, // prefill with logged-in user's email
    countryCode: "+91",
    phone: "",
    gstDetails: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const countryCodes = [
    { code: "+91", label: "India" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!hotel) {
      setError("No hotel selected.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        hotelId: hotel.id,
        hotelName: hotel.name,
        ...form,
        loggedUser: currentEmail,
      };

      await axios.post("http://localhost:3000/booking-data", payload);

      setSuccessMessage("Booking successful! Confirmation sent to your email.");

      // Navigate to MyBookings page after successful booking
      setTimeout(() => navigate("/my-bookings"), 1000);
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      {hotel && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold">{hotel.name}</h3>
          <p className="text-gray-600">{hotel.location}</p>
          <p className="text-sm text-gray-500">
            ₹{hotel.price.toLocaleString()} + taxes
          </p>
        </div>
      )}

      <h2 className="font-semibold text-lg">GUEST DETAILS</h2>

      <div className="grid grid-cols-12 gap-4 items-center">
        <label className="col-span-2 font-medium">Title</label>
        <select
          name="title"
          value={form.title}
          onChange={handleChange}
          className="col-span-3 border border-gray-300 rounded px-2 py-1"
          required
        >
          <option>Mr</option>
          <option>Mrs</option>
          <option>Ms</option>
          <option>Dr</option>
        </select>

        <label className="col-span-2 font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
          className="col-span-5 border border-gray-300 rounded px-2 py-1"
          required
        />
      </div>

      <div className="grid grid-cols-12 gap-4 items-center">
        <label className="col-span-2 font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
          className="col-span-10 border border-gray-300 rounded px-2 py-1"
          required
        />
      </div>

      <div>
        <label className="font-medium block mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email Address"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
          readOnly // prevent changing the email for logged-in users
        />
        <p className="text-xs text-gray-500 mt-1">
          (Your booking voucher will be sent to this email address)
        </p>
      </div>

      <div>
        <label className="font-medium block mb-1">Mobile Number</label>
        <div className="flex gap-2">
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          >
            {countryCodes.map(({ code, label }) => (
              <option key={code} value={code}>
                {code} {label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="gstDetails"
          id="gstDetails"
          checked={form.gstDetails}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="gstDetails" className="font-medium cursor-pointer">
          Enter GST Details (Optional)
        </label>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 text-white py-2 rounded-lg w-full hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
};

export default Booking;
