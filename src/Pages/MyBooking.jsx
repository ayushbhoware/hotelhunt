import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MoveLeft, Trash2, SquarePen, Search } from "lucide-react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const currentEmail = localStorage.getItem("useremail");

  const loadBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/booking-data");
      const filterData = res.data.filter((e) => e.loggedUser === currentEmail);
      setBookings(filterData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.firstName.toLowerCase().includes(search.toLowerCase()) ||
      b.lastName.toLowerCase().includes(search.toLowerCase()) ||
      b.hotelName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (id) => {
    const booking = bookings.find((b) => b.id === id);
    setFormData(booking);
    setEditId(id);
    setEditForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await axios.delete(`http://localhost:3000/booking-data/${id}`);
    loadBookings();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/booking-data/${editId}`, formData);
    setEditForm(false);
    loadBookings();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 px-4 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-5 py-2 bg-white rounded-xl shadow hover:scale-105 transition"
        >
          <MoveLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800">
          My Bookings
        </h1>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hotel or name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-bold text-blue-600">{b.hotelName}</h3>
              <p className="text-gray-700 font-medium mt-1">
                {b.firstName} {b.lastName}
              </p>
              <p className="text-sm text-gray-500">{b.email}</p>
              <p className="text-sm text-gray-500">
                {b.countryCode} {b.phone}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(b.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100"
                >
                  <SquarePen size={18} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
                >
                  <Trash2 size={18} /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-4 animate-fade-in"
          >
            <h2 className="text-xl font-bold text-center mb-2">Edit Booking</h2>

            <input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="First Name"
              className="w-full p-3 border rounded-xl"
            />
            <input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Last Name"
              className="w-full p-3 border rounded-xl"
            />
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Phone"
              className="w-full p-3 border rounded-xl"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditForm(false)}
                className="flex-1 bg-gray-200 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
