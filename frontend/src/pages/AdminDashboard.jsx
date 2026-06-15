import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaCheckCircle,
  FaLock,
  FaUserCheck,
  FaUserSlash,
  FaRupeeSign,
  FaPlusCircle,
  FaChartBar,
  FaBuilding,
  FaUser,
} from "react-icons/fa";

import { fetchDashboardSummary } from "../redux/thunks/adminAnalyticsThunks";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    summary = {},
    loading,
    error,
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);
  
  const cards = [
    {
      title: "Total Properties",
      value: summary.totalProperties || 0,
      icon: <FaHome />,
      color: "bg-blue-500",
      route: "/adminPropertiesListing",
    },
    {
      title: "Total Users",
      value: summary.totalUsers || 0,
      icon: <FaUsers />,
      color: "bg-green-500",
       route: "/adminUsers",
    },
    {
      title: "Total Bookings",
      value: summary.totalBookings || 0,
      icon: <FaCalendarCheck />,
      color: "bg-purple-500",
      route: "/adminBookingsList",
    },
    {
      title: "Available Properties",
      value: summary.availableProperties || 0,
      icon: <FaCheckCircle />,
      color: "bg-emerald-500",
    },
    {
      title: "Booked Properties",
      value: summary.bookedProperties || 0,
      icon: <FaLock />,
      color: "bg-red-500",
    },
    {
      title: "Active Users",
      value: summary.activeUsers || 0,
      icon: <FaUserCheck />,
      color: "bg-teal-500",
      route: "/adminUsers",
    },
    {
      title: "Disabled Users",
      value: summary.disabledUsers || 0,
      icon: <FaUserSlash />,
      color: "bg-gray-600",
       route: "/adminUsers",
    },
    
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-red-500">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 pt-4">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-emerald-600">
            Admin Panel
          </h2>
        </div>

        <nav className="px-4 space-y-2">
          <button
            onClick={() => navigate("/adminDashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-50 text-emerald-600 font-medium"
          >
            <FaChartBar />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/adminPropertiesListing")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaBuilding />
            All Properties
          </button>

          <button
            onClick={() => navigate("/addProperty")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaPlusCircle />
            Add Property
          </button>

          <button
            onClick={() => navigate("/adminBookingsList")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaCalendarCheck />
            Bookings
          </button>

          <button
            onClick={() => navigate("/adminUser")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaUsers />
            Users
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => card.route && navigate(card.route)}
              className={`bg-white rounded-2xl shadow-md p-5 transition-all duration-300 ${
                card.route
                  ? "cursor-pointer hover:shadow-xl hover:-translate-y-1"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`${card.color} text-white p-4 rounded-full text-2xl`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </main>
    </div>
  );
};

export default AdminDashboard;