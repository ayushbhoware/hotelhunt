import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Hotels from './Pages/Hotels'
import Booking from './Pages/Booking'
import Contact from './Pages/Contact'
import ProtectedRoute from "./Pages/ProtectedRoute";
import MyBooking from './Pages/MyBooking'




const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          {/* Protect the booking page */}
          <Route
            path="booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App


