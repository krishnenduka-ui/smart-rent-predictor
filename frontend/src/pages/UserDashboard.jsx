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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Welcome {user?.username} ...
          </h1>
          <p className="text-gray-500">
            Browse, compare & save your favorite properties
          </p>
        </div>

        
      </div>


      {/* SEARCH BAR */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-8">

        <div className="bg-white rounded-2xl shadow-md p-4">
          <input
            type="text"
            placeholder="Search properties by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>


      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* FILTER SIDEBAR */}
          <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-20">

            <h2 className="text-2xl font-bold mb-6">
              Filters
            </h2>

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
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
              className="w-full border p-3 rounded-xl mb-4"
            >
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
            </select>

            <select
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
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
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-3 rounded-xl"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
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

                    {/* PROPERTY GRID */}
          <div>
            {properties.length === 0 ? (
              <div className="bg-white rounded-3xl shadow p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-500">
                  No Properties Found
                </h2>
              </div>
            ) : (
              <div className="relative overflow-hidden">

                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="min-w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
                    >
                      {slide.map((property) => {
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
                            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden cursor-pointer group relative"
                          >
                            {/* IMAGE */}
                            <div className="relative overflow-hidden">
                              <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                              />

                              {/* COMPARE */}
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
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;