import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Optional: if you need to send cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Fetch dashboard data
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/dashboard");
      return res.data;
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to fetch dashboard data"
      );
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      users: 0,
      games: 0,
      blogs: 0,
      gallery: 0,
      totalRevenue: 0, // Optional: if you track revenue
      activeUsers: 0,  // Optional: if you track active users
    },
    recentActivity: [],
    loading: false,
    error: null,
    lastUpdated: null, // Track when data was last fetched
  },
  reducers: {
    // Optional: Add reducers if needed
    clearError: (state) => {
      state.error = null;
    },
    resetDashboard: (state) => {
      // Reset to initial state if needed
      state.stats = {
        users: 0,
        games: 0,
        blogs: 0,
        gallery: 0,
      };
      state.recentActivity = [];
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        
        // Safely destructure with fallbacks
        state.stats = {
          users: action.payload?.stats?.users || 0,
          games: action.payload?.stats?.games || 0,
          blogs: action.payload?.stats?.blogs || 0,
          gallery: action.payload?.stats?.gallery || 0,
        };
        
        state.recentActivity = Array.isArray(action.payload?.recentActivity) 
          ? action.payload.recentActivity 
          : [];
        
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard";
        // Keep existing data if available (optional)
      });
  },
});

export const { clearError, resetDashboard } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;