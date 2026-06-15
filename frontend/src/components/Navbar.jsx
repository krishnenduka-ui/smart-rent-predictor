import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSignOutAlt,
  FaThLarge,
  FaPlusCircle,
  FaHeart,
  FaBalanceScale,
  FaSignInAlt,
  FaUserPlus,
  FaBuilding
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading) return null;

  const isLoggedIn = !!user;
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const linkStyle =
    "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex justify-between items-center py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-md">
            <FaHome />
          </div>
          <h1 className="text-2xl font-extrabold">
            Home<span className="text-emerald-600">Worth</span>
          </h1>
        </Link>

        {/* NAV LINKS */}
        {!isLoggedIn ? (
          // 🟡 GUEST NAVBAR
          <div className="flex gap-2 items-center">
            <Link
                to="/"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl hover:text-emerald-600"
              >
                <FaHome />
                Home
              </Link>

            <Link
                to="/rentals"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl hover:text-emerald-600"
              >
                <FaBuilding />
                Rentals
              </Link>
            <Link
                to="/signup"
                className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-600 px-5 py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white transition duration-300"
              >
                <FaUserPlus />
                Sign Up
              </Link>

            <Link
                to="/login"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition duration-300 shadow-md"
              >
                <FaSignInAlt />
                Log In
              </Link>
          </div>

        ) : isAdmin ? (
          // 🔴 ADMIN NAVBAR
          <div className="flex gap-2 items-center">
            <Link to="/adminDashboard" className={linkStyle}>
              <FaThLarge /> Dashboard
            </Link>

            <Link to="/addProperty">
              <button className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-semibold">
                + Add Property
              </button>
            </Link>

            <Link to="/adminBookingsList">
              <button className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-semibold">
                Booked Properties
              </button>
            </Link>


            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

        ) : (
          // 🟢 USER NAVBAR
          <div className="flex gap-2 items-center">
            <Link to="/userDashboard" className={linkStyle}>
              <FaThLarge /> Dashboard
            </Link>

            <Link to="/favorites">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-semibold">
                <FaHeart />
                Favorites
              </button>
            </Link>

            <Link to="/compare">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-semibold">
                <FaBalanceScale />
                Compare
              </button>
            </Link>

            <Link to="/mybookings">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-semibold">
                
                My Bookings
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;