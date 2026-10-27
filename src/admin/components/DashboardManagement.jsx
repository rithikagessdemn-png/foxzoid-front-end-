import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../redux/slices/adminDashboardSlice";

const DashboardManagement = () => {
  const dispatch = useDispatch();

  const {
    stats,
    recentActivity,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const dashboardStats = [
    { label: "Total Users", value: stats.users, color: "blue" },
    { label: "Total Games", value: stats.games, color: "purple" },
    { label: "Total Blogs", value: stats.blogs, color: "green" },
    { label: "Gallery Items", value: stats.gallery, color: "orange" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Live overview from backend</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="p-6 rounded-2xl bg-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{stat.label}</h3>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center
                ${stat.color === "blue" && "bg-blue-900/30 text-blue-400"}
                ${stat.color === "purple" && "bg-purple-900/30 text-purple-400"}
                ${stat.color === "green" && "bg-green-900/30 text-green-400"}
                ${stat.color === "orange" && "bg-orange-900/30 text-orange-400"}`}
              >
                {stat.value}
              </div>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">Stored items</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl p-6 bg-gray-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : recentActivity.length === 0 ? (
          <p className="text-gray-400">No recent activity found</p>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">By {activity.user}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(activity.time).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardManagement;
