import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide"
        >
          HomeWorth
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link className="hover:text-blue-600 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-blue-600 transition" to="/rentals">
            Rentals
          </Link>

          <Link className="hover:text-blue-600 transition" to="/signup">
            SignUp
          </Link>

          <Link
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            to="/login"
          >
            LogIn
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;