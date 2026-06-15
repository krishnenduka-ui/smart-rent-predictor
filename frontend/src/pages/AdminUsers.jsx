import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/adminUsers/all-users");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      await api.put(`/adminUsers/toggle-user/${id}`);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? {
                ...user,
                isDisabled: !user.isDisabled,
              }
            : user
        )
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update user status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const activeUsers = users.filter(
    (user) => !user.isDisabled
  ).length;

  const disabledUsers = users.filter(
    (user) => user.isDisabled
  ).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">
          Loading Users...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        User Management
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-green-600">
            Active Users
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {activeUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-red-600">
            Disabled Users
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {disabledUsers}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">
                Username
              </th>
              <th className="p-4 text-left">
                Email
              </th>
              <th className="p-4 text-center">
                Role
              </th>
              <th className="p-4 text-center">
                Status
              </th>
              <th className="p-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4 text-center">
                  {user.role}
                </td>

                <td className="p-4 text-center">
                  {user.isDisabled ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                      Disabled
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  )}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      toggleUserStatus(user._id)
                    }
                    className={`px-4 py-2 rounded-lg text-white font-medium ${
                      user.isDisabled
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {user.isDisabled
                      ? "Enable"
                      : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center p-8 text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;