import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  let navigate = useNavigate();

  // Get query params (e.g., ?mylocate=Indore)
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("mylocate") || "";

  let handleSubmit = (hotel) => {
    navigate("/booking", { state: { hotel } });
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);

        // Fetch data from JSON server
        const res = await axios.get("http://localhost:3000/hotels-data");
        let data = res.data || [];

        // Filter by city if query param exists
        if (city) {
          data = data.filter(
            (hotel) => hotel.city.toLowerCase() === city.toLowerCase(),
          );
        }

        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city]);

  if (loading) return <p className="text-center mt-10">Loading hotels...</p>;
  if (hotels.length === 0)
    return <p className="text-center mt-10">No hotels found in {city}.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Showing Properties in {city || "All Cities"}
      </h2>
      <div className="space-y-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex gap-4 border rounded p-4 shadow-sm bg-white"
          >
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-48 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-yellow-400 text-white px-2 rounded font-semibold">
                  {hotel.rating}★
                </span>
                <span className="text-sm text-gray-600">{hotel.type}</span>
                <span className="ml-auto text-sm text-gray-500">
                  {hotel.ratingsCount} Ratings
                </span>
                <span className="ml-2 bg-green-600 text-white px-2 rounded text-sm">
                  {hotel.reviewScore}/5
                </span>
              </div>
              <h3 className="text-xl font-bold">{hotel.name}</h3>
              <p className="text-blue-600 cursor-pointer">{hotel.location}</p>

              <div className="flex gap-2 my-2 flex-wrap">
                {hotel.features?.map((f, i) => (
                  <span
                    key={i}
                    className="border rounded px-2 py-1 text-sm text-gray-700"
                  >
                    {f}
                  </span>
                ))}
                {hotel.moreFeatures && (
                  <span className="text-blue-600 cursor-pointer">
                    &amp; more
                  </span>
                )}
              </div>

              <ul className="text-sm text-gray-600 mb-3">
                {hotel.benefits?.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right flex flex-col justify-between">
              <div>
                <p className="text-xl font-bold">
                  ₹{hotel.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  +₹{hotel.taxes.toLocaleString()} taxes & fees per night
                </p>
              </div>
              <button
                onClick={() => handleSubmit(hotel)}
                className="text-blue-700 underline text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
