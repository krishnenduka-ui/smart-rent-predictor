import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <h1>User Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;