import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
const [form, setForm] = useState({
  mylocate: "",
  mycheckin: "",
  mycheckout: "",
  rooms: 1,
  adults: 1,
  children: 0,
});

    const navigate = useNavigate();

const [openGuest, setOpenGuest] = useState(false);

  const guestText = `${form.rooms} Room · ${form.adults} Adult · ${form.children} Child`;



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCounter = (field, type) => {
    setForm((prev) => {
      let value = prev[field];

      if (type === "inc") value++;
      if (type === "dec" && value > 0) value--;

      // minimum limits
      if (field === "rooms" && value < 1) value = 1;
      if (field === "adults" && value < 1) value = 1;

      return { ...prev, [field]: value };
    });
  };


  useEffect(() => {
    console.log("Form data:", form);
  }, [form]);

const handleSubmit = async (e) => {
  e.preventDefault();

      const query = new URLSearchParams(form).toString();
      navigate(`/hotels?${query}`);

  const api = "http://localhost:3000/search-data";
  const response = await axios.post(api, form);

  console.log(response.data);
  alert("Searching successfully");
};


  return (
    <div className="font-sans">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          src="./bgvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Find Your Perfect Stay
          </h2>
          <p className="text-gray-200 mb-8">
            Book hotels at the best prices, anywhere in the world 🌍
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-6 rounded"
          >
            <select
              name="mylocate"
              value={form.mylocate}
              onChange={handleChange}
              className="border p-3 rounded bg-white"
            >
              <option value="">Select City</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Indore">Indore</option>
            </select>

            <input
              type="date"
              name="mycheckin"
              value={form.mycheckin}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="date"
              name="mycheckout"
              value={form.mycheckout}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <div className="relative">
              <div
                onClick={() => setOpenGuest(!openGuest)}
                className="border p-3 rounded cursor-pointer bg-white"
              >
                {guestText}
              </div>

              {openGuest && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded p-4 mt-2 z-50">
                  {/* Rooms */}
                  <div className="flex justify-between items-center mb-3">
                    <span>Rooms</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCounter("rooms", "dec")}
                        className="border px-2"
                      >
                        -
                      </button>
                      <span>{form.rooms}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("rooms", "inc")}
                        className="border px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Adults */}
                  <div className="flex justify-between items-center mb-3">
                    <span>Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCounter("adults", "dec")}
                        className="border px-2"
                      >
                        -
                      </button>
                      <span>{form.adults}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("adults", "inc")}
                        className="border px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex justify-between items-center mb-4">
                    <span>Children</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCounter("children", "dec")}
                        className="border px-2"
                      >
                        -
                      </button>
                      <span>{form.children}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("children", "inc")}
                        className="border px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenGuest(false)}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-3 hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-10 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 shadow rounded">
            <h4 className="text-xl font-semibold mb-2">Best Prices</h4>
            <p className="text-gray-600">Guaranteed best deals on hotels.</p>
          </div>
          <div className="p-6 shadow rounded">
            <h4 className="text-xl font-semibold mb-2">Easy Booking</h4>
            <p className="text-gray-600">
              Book your stay in just a few clicks.
            </p>
          </div>
          <div className="p-6 shadow rounded">
            <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600">We are here to help you anytime.</p>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="bg-gray-50 py-16 px-10">
        <h3 className="text-3xl font-bold text-center mb-10">
          Featured Hotels</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((hotel) => (
            <div
              key={hotel}
              className="bg-white rounded shadow overflow-hidden"
            >
              <img
                src="/hotel1.avif"
                alt="hotel"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">Luxury Hotel</h4>
                <p className="text-gray-600">Bhopal, India</p>
                <p className="text-blue-600 font-bold mt-2">₹4,999 / night</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
