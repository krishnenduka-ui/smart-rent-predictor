import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/thunks/authThunks";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading,error,success} = useSelector((state)=>state.auth)

  const [formdata,setFormData] =  useState({
    username:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    setFormData({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const result = await dispatch(registerUser(formdata))

    if(result.meta.requestStatus==="fulfilles=d"){
      navigate("/")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;