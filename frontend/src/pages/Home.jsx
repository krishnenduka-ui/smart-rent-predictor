import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


const Home = () => {

 
  const handleClick = () => {
    navigate("/rentals")
  }

  return (
    <div className="min-h-screen">


      <section className="bg-[url('/src/assets/images/bg-image.jpg')] bg-cover bg-center text-white font-bold text-center p-30 h-100">
        <h1 className="sm:text-3xl md:text-4xl lg:text-5xl ">Find Your Perfect Rental</h1>
        <p className="mt-5 sm:text-sm md:text-base lg:text-lg">Your Next Home is Just a Click Away</p>
        <button
          onClick={() => navigate("/rentals")}
          className="mt-6 bg-white text-green-600 px-6 py-3 rounded hover:text-gray-300"
        >
          Explore Rentals
        </button>

      </section>
      <div className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-center sm:text-xl md:text-2xl lg:text-3xl font-bold">Rent Smarter, Live Better</h2>
        <p className="mt-5 sm:text-sm md:text-base lg:text-lg">Smart rent estimation for any property instantly </p>
        <button
          onClick={() => navigate("/rent-estimator")}
          className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded"
        >
          Rent Estimator
        </button>
      </div>


      

    </div>


  );
}

export default Home