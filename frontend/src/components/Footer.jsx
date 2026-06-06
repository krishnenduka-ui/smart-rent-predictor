import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

       
        <div>
          <h2 className="text-3xl font-bold text-white">
            Rental Homes
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            Find the perfect rental property with ease. 
            Explore apartments, villas, and homes tailored to your lifestyle.
          </p>

          
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-emerald-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/rentals"
                className="hover:text-emerald-400 transition"
              >
                Rentals
              </Link>
            </li>

            <li>
              <Link
                to="/favorites"
                className="hover:text-emerald-400 transition"
              >
                Favorites
              </Link>
            </li>

            <li>
              <Link
                to="/compare"
                className="hover:text-emerald-400 transition"
              >
                Compare
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Services
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="hover:text-emerald-400 transition cursor-pointer">
              Property Listing
            </li>

            <li className="hover:text-emerald-400 transition cursor-pointer">
              Rent Estimation
            </li>

            <li className="hover:text-emerald-400 transition cursor-pointer">
              Property Comparison
            </li>

            <li className="hover:text-emerald-400 transition cursor-pointer">
              Customer Support
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-sm">
            <p>📍 Kochi, Kerala, India</p>

            <p>📞 +91 9854782514</p>

            <p>✉️ support@homeworth.com</p>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © 2026 Homeworth. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;