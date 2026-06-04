import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/authThunks";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user,loading,error} = useSelector((state)=>state.auth)

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e) =>{
    setFormData({
      ...formData,[e.target.name]:e.target.value,

    })
  }
  const handleSubmit=(e) =>{
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  useEffect(()=>{
    if(user){
      if(user.role === "admin"){
        navigate("/adminDashboard")
      }else{
        navigate("/userDashboard")
      }
    }
  } ,[user,navigate])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SignIn
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
              placeholder="Enter password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {/* Signup link */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;