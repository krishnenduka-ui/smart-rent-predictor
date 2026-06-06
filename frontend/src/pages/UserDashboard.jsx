import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    fetchFavorites,
    addFavorite,
    removeFavorite,
    } from "../redux/thunks/favoriteThunks";

import {
    fetchCompare,
    addCompare,
    removeCompare,
    } from "../redux/thunks/compareThunks";

const UserDashboard = () => {
  const [properties, setProperties] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { compareIds } = useSelector((state) => state.compare);
  const { favorites } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.auth);

  // FETCH PROPERTIES
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/property");
        setProperties(res.data);
      } catch (err) {
        console.error("Property fetch error:", err);
      }
    };

    fetchProperties();
  }, []);

  // FAVORITES (reload after login)
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user?._id]);



  
  useEffect(() => {
  if (user?._id) {
    dispatch(fetchCompare());
  }
}, [dispatch, user?._id]);




  // FAVORITE TOGGLE
  const toggleFavorite = (id) => {
    const isFav = favorites.some((fav) => fav._id === id);

    if (isFav) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };


  //Compare toggle
  const toggleCompare = (id) => {
  const isCompare = compareIds.includes(id);

  if (isCompare) {
    dispatch(removeCompare(id));
  } else {
    if (compareIds.length >= 4) {
      alert("Only 4 properties allowed");
      return;
    }

    dispatch(addCompare(id));
  }
};

//Logout
  
const handleLogout = () => {
  dispatch(logout())
  navigate("/login",{replace: true})
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            User Dashboard
          </h1>
          <p className="text-gray-500">
            Browse, compare & save your favorite properties
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => navigate("/favorites")}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold transition"
          >
            Favorites
          </button>

          <button
            onClick={() => navigate("/compare")}
            disabled={compareIds.length < 2}
            className="bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-40 transition"
          >
            Compare ({compareIds.length})
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-semibold transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

        {properties.map((property) => {
          const isFav = favorites.some(
            (fav) => fav._id === property._id
          );

          const isCompare = compareIds.includes(property._id);

          return (
            <div
              key={property._id}
              onClick={() => navigate(`/property/${property._id}`)}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden cursor-pointer group relative"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* COMPARE BADGE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(property._id);
                  }}
                  className={`absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold shadow ${
                    isCompare
                      ? "bg-black text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <FaBalanceScale />
                  Compare
                </button>

                {/* FAVORITE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property._id);
                  }}
                  className="absolute top-4 right-4 text-2xl text-red-500 bg-white/80 p-2 rounded-full shadow"
                >
                  {isFav ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {property.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  {property.location}
                </p>

                <p className="text-2xl font-extrabold text-emerald-600 mt-3">
                  ₹{property.price}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;