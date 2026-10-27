// AdminUserManagement.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ✅ FIX 1: Import the correct thunk name from adminUserSlice
import { fetchAdminUsers, clearAdminError } from "../../redux/slices/adminUserSlice";

const AdminUserManagement = () => {
  const dispatch = useDispatch();

  // ✅ FIX 2: Select state from the correct slice: `state.adminUsers`
  const users = useSelector((state) => state.adminUsers.users) || [];
  const loading = useSelector((state) => state.adminUsers.loading);
  const error = useSelector((state) => state.adminUsers.error);
  
  // The token is still in the auth slice
  const token = useSelector((state) => state.auth.user?.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [searchTerm, setSearchTerm] = useState("");

  // Effect to fetch users when component mounts
  useEffect(() => {
    if (isAuthenticated && token) {
      // ✅ FIX 3: Dispatch the correct thunk
      dispatch(fetchAdminUsers());
    }
  }, [dispatch, isAuthenticated, token]);

  const handleRetry = () => {
    dispatch(clearAdminError()); // Clear the error before retrying
    if (isAuthenticated && token) {
      dispatch(fetchAdminUsers());
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-400">
            Admin panel for managing registered users
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={handleRetry}
              className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}

        {/* Main Content */}
        {!loading && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-semibold">Active This Month</h3>
                <p className="text-3xl font-bold">
                  {
                    users.filter(
                      (u) =>
                        new Date(u.createdAt) >
                        new Date(
                          new Date().setDate(new Date().getDate() - 30)
                        )
                    ).length
                  }
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <p className="text-3xl font-bold">
                  {filteredUsers.length}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Users Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-4 px-6 text-left">Name</th>
                      <th className="py-4 px-6 text-left">Email</th>
                      <th className="py-4 px-6 text-left">
                        Registration Date
                      </th>
                      <th className="py-4 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-750">
                          <td className="py-4 px-6">{user.name}</td>
                          <td className="py-4 px-6">{user.email}</td>
                          <td className="py-4 px-6">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="py-4 px-6">—</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-10 text-center text-gray-400"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;