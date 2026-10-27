import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token =
        state.auth.user?.token || JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) return thunkAPI.rejectWithValue("No authentication token found.");

      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users.");
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: { users: [], loading: false, error: null },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminUserSlice.actions;
export const selectAdminUsers = (state) => state.adminUsers.users;
export const selectAdminLoading = (state) => state.adminUsers.loading;
export const selectAdminError = (state) => state.adminUsers.error;

export default adminUserSlice.reducer;
