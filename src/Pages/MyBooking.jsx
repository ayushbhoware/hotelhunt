import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MoveLeft, Trash2, SquarePen } from "lucide-react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    gstDetails: false,
  });

  const navigate = useNavigate();

  const currentEmail = localStorage.getItem("useremail")

  // Load bookings
const loadBookings = async () => {
  try {
    const res = await axios.get("http://localhost:3000/booking-data");
    console.log(res.data); // check the API response

    // Filter only bookings for current user
    const filterData = res.data.filter((e) => e.loggedUser === currentEmail);

    setBookings(filterData);
  } catch (err) {
    console.error("Error fetching bookings", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    // if(!currentEmail){
        loadBookings()
    // }
  }, []);

  // Filter bookings by name or hotel
  const filteredBookings = bookings.filter(
    (b) =>
      b.firstName.toLowerCase().includes(search.toLowerCase()) ||
      b.lastName.toLowerCase().includes(search.toLowerCase()) ||
      b.hotelName.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Edit booking
  const handleEdit = (id) => {
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
      setFormData(booking);
      setEditId(id);
      setEditForm(true);
    }
  };

  // Update booking
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editId) return;

    try {
      await axios.put(`http://localhost:3000/booking-data/${editId}`, formData);
      alert("Booking updated successfully!");
      setEditForm(false);
      setEditId(null);
      loadBookings();
    } catch (err) {
      alert("Failed to update booking");
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await axios.delete(`http://localhost:3000/booking-data/${id}`);
      alert("Booking cancelled successfully!");
      loadBookings();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
        >
          <MoveLeft size={18} /> Go Back
        </button>

        <h2 className="text-2xl font-bold">
          {editId ? "Edit Booking" : "My Bookings"}
        </h2>
      </div>

      {/* Search */}
      <div className="w-full max-w-6xl mb-4">
        <input
          type="text"
          placeholder="Search by name or hotel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* No data */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-xl">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block w-full max-w-6xl bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full divide-y">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Hotel</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Phone</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{b.hotelName}</td>
                    <td className="px-6 py-3">
                      {b.firstName} {b.lastName}
                    </td>
                    <td className="px-6 py-3">{b.email}</td>
                    <td className="px-6 py-3">
                      {b.countryCode} {b.phone}
                    </td>
                    <td className="px-6 py-3 text-center flex gap-4 justify-center">
                      <button
                        onClick={() => handleEdit(b.id)}
                        className="text-blue-600 flex items-center gap-1"
                      >
                        <SquarePen size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-red-600 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden w-full max-w-6xl grid grid-cols-1 gap-4 mt-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-lg font-bold">
                      {b.firstName} {b.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{b.email}</p>
                    <p className="text-sm text-gray-500">{b.hotelName}</p>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {b.countryCode} {b.phone}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(b.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold"
                  >
                    <SquarePen size={18} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold"
                  >
                    <Trash2 size={18} /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit Form */}
      {editForm && (
        <form
          onSubmit={handleUpdate}
          className="w-full max-w-xl bg-white p-6 mt-8 rounded-xl shadow space-y-4"
        >
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="gstDetails"
              checked={formData.gstDetails}
              onChange={handleChange}
            />
            GST Details Provided
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            Update Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default MyBooking;
