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
            Book hotels at the best prices, anywhere in the world
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-transparent backdrop-blur-lg p-6 rounded-2xl shadow-xl animate-fade-in text-amber-100"
          >
            {/* Location */}
            <select
              name="mylocate"
              value={form.mylocate}
              onChange={handleChange}
              className="border border-gray-200 p-3 rounded-xl  focus:ring-blue-500 outline-none transition "
            >
              <option value="" className="text-black">
                Select City
              </option>
              <option value="Bhopal" className="text-black">
                Bhopal
              </option>
              <option value="Indore" className="text-black">
                Indore
              </option>
            </select>

            {/* Check-in */}
            <input
              type="date"
              name="mycheckin"
              value={form.mycheckin}
              onChange={handleChange}
              className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            {/* Check-out */}
            <input
              type="date"
              name="mycheckout"
              value={form.mycheckout}
              onChange={handleChange}
              className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            {/* Guests */}
            <div className="relative">
              <div
                onClick={() => setOpenGuest(!openGuest)}
                className="border border-gray-200 p-3 rounded-xl cursor-pointer hover:shadow-md transition"
              >
                 {guestText}
              </div>

              {openGuest && (
                <div className="absolute top-full left-0 w-full  rounded-xl shadow-2xl p-4 mt-2 z-50 animate-slide-down">
                  {/* Rooms */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Rooms</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCounter("rooms", "dec")}
                        className="px-3 py-1 rounded-full border hover:bg-gray-400"
                      >
                        −
                      </button>
                      <span>{form.rooms}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("rooms", "inc")}
                        className="px-3 py-1 rounded-full border hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Adults */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCounter("adults", "dec")}
                        className="px-3 py-1 rounded-full border hover:bg-gray-400"
                      >
                        −
                      </button>
                      <span>{form.adults}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("adults", "inc")}
                        className="px-3 py-1 rounded-full border hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Children</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCounter("children", "dec")}
                        className="px-3 py-1 rounded-full border hover:bg-gray-400"
                      >
                        −
                      </button>
                      <span>{form.children}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("children", "inc")}
                        className="px-3 py-1 rounded-full border hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenGuest(false)}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-4 py-3 font-semibold hover:scale-105 transition duration-300 shadow-lg"
            >
               Search
            </button>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-4xl font-bold text-center mb-4">Why Choose Us?</h3>
        <p className="text-gray-600 text-center mb-14">
          Everything you need for a smooth and comfortable booking experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature Card */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-4 group-hover:scale-110 transition"></div>
            <h4 className="text-xl font-bold mb-2">Best Prices</h4>
            <p className="text-gray-600">
              Guaranteed best deals on hotels with no hidden charges.
            </p>
          </div>

          {/* Feature Card */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-4 group-hover:scale-110 transition"></div>
            <h4 className="text-xl font-bold mb-2">Easy Booking</h4>
            <p className="text-gray-600">
              Book your stay in just a few clicks with instant confirmation.
            </p>
          </div>

          {/* Feature Card */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-4 group-hover:scale-110 transition"></div>
            <h4 className="text-xl font-bold mb-2">24/7 Support</h4>
            <p className="text-gray-600">
              Our support team is available anytime to help you.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-12">
        <h3 className="text-4xl font-bold text-center mb-4">Featured Hotels</h3>
        <p className="text-gray-600 text-center mb-12">
          Hand-picked stays for a comfortable and luxurious experience
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              name: "Hotel Amer Palace",
              city: "Bhopal",
              price: "₹4,999",
              rating: "4.8",
              img: "/Hotel1.jpg",
            },
            {
              name: "Lake View Resort",
              city: "Bhopal",
              price: "₹6,499",
              rating: "4.6",
              img: "/Hotel2.jpg",
            },
            {
              name: "Jehan Numa Retreat",
              city: "Bhopal",
              price: "₹5,299",
              rating: "4.7",
              img: "/Hotel3.jpg",
            },
            {
              name: "Effotel by Sayaji",
              city: "Indore",
              price: "₹8,999",
              rating: "4.9",
              img: "/Hotel4.jpg",
            },
            {
              name: "Ginger Hotel Indore",
              city: "Indore",
              price: "₹7,499",
              rating: "4.2",
              img: "/Hotel5.jpg",
            },
            {
              name: "Indore Marriott Hotel",
              city: "Indore",
              price: "₹3,499",
              rating: "4.4",
              img: "/Hotel6.jpg",
            },
          ].map((hotel, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Rating Badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {hotel.rating}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-xl font-bold mb-1">{hotel.name}</h4>
                <p className="text-gray-500 text-sm mb-3">
                  📍 {hotel.city}, India
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {hotel.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      / night
                    </span>
                  </span>

                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
