import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
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
import { bookProperty } from "../redux/thunks/bookingThunks";

const UserDashboard = () => {
  const [properties, setProperties] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amenities, setAmenities] = useState("");
  const [sort, setSort] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 6;

  const { compareIds } = useSelector((state) => state.compare);
  const { favorites } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.auth);

  // FETCH PROPERTIES
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const params = {};

        if (search) params.search = search;
        if (location) params.location = location;
        if (bedrooms) params.bedrooms = bedrooms;
        if (propertyType) params.propertyType = propertyType;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (amenities) params.amenities = amenities;
        if (sort) params.sort = sort;

        const res = await api.get("/property", { params });

        setProperties(res.data);
      } catch (err) {
        console.error("Property fetch error:", err);
      }
    };

    fetchProperties();
  }, [
    search,
    location,
    bedrooms,
    propertyType,
    minPrice,
    maxPrice,
    amenities,
    sort,
  ]);
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


  const handleBooking = async (propertyId, e) => {
    e.stopPropagation();

    try {
      await dispatch(bookProperty(propertyId)).unwrap();

      alert("Property booked successfully");

      // Reload properties
      const res = await api.get("/property");
      setProperties(res.data);

    } catch (error) {
      alert(error);
    }
  };

  // Auto Slider
  useEffect(() => {
    if (properties.length <= itemsPerSlide) return;

    const totalSlides = Math.ceil(
      properties.length / itemsPerSlide
    );

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= totalSlides - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [properties]);


  // Create slides
  const slides = [];

  for (let i = 0; i < properties.length; i += itemsPerSlide) {
    slides.push(properties.slice(i, i + itemsPerSlide));
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">

        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-10 text-white shadow-xl">

          <h1 className="text-5xl font-bold">
            Welcome Back, {user?.username} 👋
          </h1>

          <p className="mt-3 text-lg text-emerald-100">
            Search, compare and book your perfect rental property.
          </p>

        </div>

      </div>




      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mt-6 mb-8">

  <div onClick={() => navigate("/rent-estimator")}
      className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-5 flex items-center justify-between cursor-pointer hover:shadow-xl hover:border-emerald-300 transition-all" >

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
        💰
      </div>

      <div>
        <h3 className="font-bold text-xl text-gray-800">
          AI Rent Predictor
        </h3>

        <p className="text-gray-500 text-sm">
          Estimate rental prices instantly.
        </p>
      </div>

    </div>

    <button
      className="
        bg-emerald-600
        text-white
        px-5
        py-2.5
        rounded-xl
        font-semibold
        hover:bg-emerald-700"
    >
      Try Now
    </button>

  </div>

</div>

      {/* SEARCH BAR */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-5 border border-gray-100">
          <input
            type="text"
            placeholder="🔍 Search properties by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>


      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

          {/* FILTER SIDEBAR */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 h-fit sticky top-20">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🔍 Filters
            </h2>

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4"
            />

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4"
            >
              <option value="">Bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="3+">3+ BHK</option>
            </select>

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4"
            >
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
            </select>

            <select
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4"
            >
              <option value="">Amenities</option>
              <option value="wifi">WiFi</option>
              <option value="parking">Parking</option>
              <option value="pool">Pool</option>
              <option value="gym">Gym</option>
              <option value="security">Security</option>
            </select>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
              <option value="rating_desc">Rating</option>
              <option value="popularity_desc">Popularity</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setLocation("");
                setBedrooms("");
                setPropertyType("");
                setAmenities("");
                setMinPrice("");
                setMaxPrice("");
                setSort("");
              }}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
            >
              Clear Filters
            </button>
          </div>

          {/* PROPERTY SECTION */}
          <div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Available Properties
              </h2>

              <div className="bg-white px-4 py-2 rounded-xl shadow">
                {properties.length} Results Found
              </div>
            </div>

            {properties.length === 0 ? (
              <div className="bg-white rounded-3xl shadow p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-500">
                  No Properties Found
                </h2>
              </div>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {properties.map((property) => {

                  const isFav = favorites.some(
                    (fav) => fav._id === property._id
                  );

                  const isCompare = compareIds.includes(
                    property._id
                  );

                  return (
                    <div
                      key={property._id}
                      onClick={() =>
                        navigate(`/property/${property._id}`)
                      }
                      className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  border
                  border-gray-100
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  cursor-pointer
                  group
                "
                    >

                      {/* IMAGE */}
                      <div className="relative overflow-hidden">

                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold shadow">
                            {property.propertyType}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare(property._id);
                          }}
                          className={`absolute top-4 left-4 px-3 py-2 rounded-full shadow text-sm font-semibold ${isCompare
                              ? "bg-black text-white"
                              : "bg-white text-gray-700"
                            }`}
                        >
                          <FaBalanceScale />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(property._id);
                          }}
                          className="absolute top-4 right-4 text-red-500 bg-white p-3 rounded-full shadow"
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
                          📍 {property.location}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-yellow-500">
                            ⭐⭐⭐⭐⭐
                          </span>

                          <span className="text-gray-500">
                            {property.rating || 4.5}
                          </span>
                        </div>

                        <div className="flex gap-4 mt-4 text-sm text-gray-600">
                          <span>🛏 {property.bedrooms} BHK</span>
                          <span>🛁 {property.bathrooms}</span>
                          <span>📐 {property.area} sqft</span>
                        </div>

                        <p className="text-3xl font-extrabold text-emerald-600 mt-4">
                          ₹{property.price}
                        </p>

                        <div className="mt-4">

                          {property.bookingStatus === "Available" && (
                            <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-semibold">
                              Available
                            </span>
                          )}

                          {property.bookingStatus === "Pending" && (
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full text-sm font-semibold">
                              Pending Approval
                            </span>
                          )}

                          {property.bookingStatus === "Confirmed" && (
                            <span className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm font-semibold">
                              Confirmed
                            </span>
                          )}

                        </div>

                        <div className="mt-6">

                          {property.isBooked ? (
                            <button
                              disabled
                              className="w-full bg-gray-400 text-white py-3 rounded-xl"
                            >
                              Already Booked
                            </button>
                          ) : (
                            <button
                              onClick={(e) =>
                                handleBooking(property._id, e)
                              }
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold"
                            >
                              Book Property
                            </button>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;