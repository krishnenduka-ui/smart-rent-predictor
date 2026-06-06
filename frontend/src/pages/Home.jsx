import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const Home = () => {
  const navigate = useNavigate();

  const [featuredProperties, setFeaturedProperties] = useState([]);
  
  const [currentIndex,setCurrentIndex] = useState(0)
  const itemsPerView = 3
 

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const res = await api.get("/property/featured");
        setFeaturedProperties(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeaturedProperties();
  }, []);

  //Auto slider
  useEffect(()=>{
    if(featuredProperties.length <= itemsPerView) return;

    const interval = setInterval(()=>{
      setCurrentIndex((prev)=>{
        const maxIndex = featuredProperties.length - itemsPerView
        if(prev >= maxIndex) return 0

        return prev + 1

      })
    },3000)
    return () => clearInterval(interval)
  },[featuredProperties])


  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section
        className="relative min-h-[85vh] sm:min-h-[90vh] bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('/images/bg-image.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white w-full max-w-5xl px-2 sm:px-6">
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Find Your Perfect Rental Home
          </h1>

          <p className="mt-5 text-sm sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover apartments, villas, and homes tailored to your lifestyle.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <button
              onClick={() => navigate("/rentals")}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 transition px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg"
            >
              Explore Rentals
            </button>

            
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-16">
        
        <div className="text-center mb-10 sm:mb-14">
          
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">
            Featured Properties
          </h2>

          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Handpicked homes recommended just for you
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-hidden">

          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {featuredProperties.map((property) => (
              <div
                key={property._id}
                onClick={() => navigate(`/property/${property._id}`)}
                className="min-w-[100%] sm:min-w-[50%] xl:min-w-[33.33%] group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-1">
                      {property.title}
                    </h3>

                    
                  </div>

                  <p className="text-gray-500 mt-2 text-sm line-clamp-1">
                    📍 {property.location}
                  </p>

                  <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-4">
                    ₹{property.price}
                  </p>

                  <div className="flex justify-between mt-5 border-t pt-4 text-gray-600 text-xs sm:text-sm">
                    <span>🛏 {property.bedrooms} Beds</span>
                    <span>🛁 {property.bathrooms} Baths</span>
                  </div>

                  <button className="w-full mt-5 bg-gray-900 text-white py-3 rounded-lg hover:bg-emerald-600 transition text-sm sm:text-base">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* RENT ESTIMATOR SECTION */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-14 sm:py-20 px-4 sm:px-6">

        <div className="max-w-5xl mx-auto text-center text-white">

          <h2 className="text-2xl sm:text-4xl font-bold leading-snug">
            Rent Smarter, Live Better
          </h2>

          <p className="mt-5 text-sm sm:text-lg text-gray-100 max-w-2xl mx-auto">
            Get smart rent estimates instantly and make better rental decisions.
          </p>

          <button
            onClick={() => navigate("/rent-estimator")}
            className="mt-8 w-full sm:w-auto bg-white text-emerald-700 px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
           Rent Estimator
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;