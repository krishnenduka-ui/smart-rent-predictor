import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBuilding, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-5">
          
          
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-md">
              <FaHome className="text-xl" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
              <span className="text-gray-900">Home</span>
              <span className="text-emerald-600">Worth</span>
            </h1>
          </Link>



          
         
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-700 font-medium">
            
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/"
                className="hover:text-emerald-600 transition duration-300 flex items-center gap-2"
              >
                <FaHome />
                Home
              </Link>

              <Link
                to="/rentals"
                className="hover:text-emerald-600 transition duration-300 flex items-center gap-2"
              >
                <FaBuilding />
                Rentals
              </Link>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 md:ml-4">
              
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;