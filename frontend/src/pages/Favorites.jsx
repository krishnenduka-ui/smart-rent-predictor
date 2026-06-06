import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFavorite,
} from "../redux/thunks/favoriteThunks";

import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favorites, loading, error } = useSelector(
    (state) => state.favorites
  );

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            My Favorites ❤️
          </h1>
          <p className="text-gray-500">
            Your saved properties collection
          </p>
        </div>

        <button
          onClick={() => navigate("/userDashboard")}
          className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Back
        </button>
      </div>

      
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

    
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      
      {!loading && favorites.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No favorites yet ❤️
        </p>
      )}

      
      {!loading && favorites.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {favorites.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden group"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={
                    p.images?.[0] ||
                    p.image ||
                    "https://via.placeholder.com/600x400"
                  }
                  alt={p.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* REMOVE BUTTON */}
                <button
                  onClick={() =>
                    handleRemoveFavorite(p._id)
                  }
                  className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h2 className="text-xl font-bold text-gray-800">
                  {p.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {p.location}
                </p>

                <p className="text-2xl font-extrabold text-emerald-600 mt-3">
                  ₹{p.price}
                </p>

                <button
                  onClick={() =>
                    navigate(`/property/${p._id}`)
                  }
                  className="mt-5 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold transition"
                >
                  View Details
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;