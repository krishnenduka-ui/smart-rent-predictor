import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../redux/thunks/propertyThunks";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaDumbbell,
  FaShieldAlt,
} from "react-icons/fa";

const Rentals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading, error } = useSelector(
    (state) => state.properties
  );

  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [sort, setSort] = useState("");

  //Carousel
  const [currentIndex,setCurrentIndex] = useState(0)
  const itemsPerSlide = 4

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleAmenities = (e) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((a) => a !== value)
    );
  };

  const handleSearch = () => {
    const filters = {};

    if (location) filters.location = location;
    if (bedrooms) filters.bedrooms = bedrooms;
    if (propertyType) filters.propertyType = propertyType;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (sort) filters.sort = sort;

    if (amenities.length > 0) {
      filters.amenities = amenities.join(",");
    }

    dispatch(fetchProperties(filters));
    setCurrentIndex(0)
  };

  //Autoslider
  useEffect(()=>{
    if(properties.length <= itemsPerSlide)return

      const totalSlides = Math.ceil(properties.length/itemsPerSlide)

      const interval = setInterval(()=>{
        setCurrentIndex((prev)=>
        prev >= totalSlides - 1 ? 0 : prev+1
      )
      },3000)

      return () => clearInterval(interval)
  },[properties])


  const slides = []
  for(let i = 0; i < properties.length; i+=itemsPerSlide){
    slides.push(properties.slice(i,i+itemsPerSlide))
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

      {/* HERO */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Find Your Dream Rental
          </h1>
          <p className="text-gray-300 text-lg">
            Explore premium homes, apartments & villas
          </p>
        </div>
      </div>

      {/* MAIN WRAPPER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10">

          {/* FILTER PANEL */}
          <div className="bg-white/90 backdrop-blur-lg p-7 rounded-3xl shadow-xl border border-gray-100 h-fit sticky top-20">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gray-100 p-2 rounded-lg">
                <FaSearch className="text-gray-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Filters
              </h2>
            </div>

            {/* LOCATION */}
            <input
              type="text"
              placeholder="Search location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-gray-500"
            />

            {/* BEDROOMS */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3+">3+</option>
            </select>

            {/* TYPE */}
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
            </select>

            {/* PRICE */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-3 rounded-xl focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-3 rounded-xl focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl mb-5 focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
              <option value="rating_desc">Rating</option>
            </select>

            {/* AMENITIES */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Amenities</h3>

              <div className="space-y-2 text-gray-700">

                <label className="flex items-center gap-2">
                  <input type="checkbox" value="wifi" onChange={handleAmenities} />
                  <FaWifi /> Wi-Fi
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" value="pool" onChange={handleAmenities} />
                  <FaSwimmingPool /> Pool
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" value="parking" onChange={handleAmenities} />
                  <FaParking /> Parking
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" value="gym" onChange={handleAmenities} />
                  <FaDumbbell /> Gym
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" value="security" onChange={handleAmenities} />
                  <FaShieldAlt /> Security
                </label>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSearch}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Search Properties
            </button>
          </div>

                    {/* ✅ CAROUSEL */}
          <div>

            {loading && (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <div className="relative overflow-hidden">

              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >

                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full grid grid-cols-2 gap-6"
                  >
                    {slide.map((property) => (
                      <div
                        key={property._id}
                        onClick={() =>
                          navigate(`/property/${property._id}`)
                        }
                        className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition cursor-pointer overflow-hidden"
                      >
                        <img
                          src={property.image}
                          className="w-full h-64 object-cover"
                        />

                        <div className="p-5">

                          <h3 className="text-lg font-bold">
                            {property.title}
                          </h3>

                          <div className="flex items-center gap-2 text-gray-500 mt-2">
                            <FaMapMarkerAlt />
                            {property.location}
                          </div>

                          <p className="text-xl font-bold text-emerald-600 mt-3">
                            ₹{property.price}
                          </p>

                          <div className="flex justify-between mt-4 bg-gray-100 p-3 rounded-xl text-sm">
                            <span>🛏 {property.bedrooms}</span>
                            <span>🛁 {property.bathrooms}</span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;