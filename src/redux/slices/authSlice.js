import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

/* ========================
   THUNKS
======================== */

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register`, formData);

      // store ONLY token
      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token })
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, formData);

      // store ONLY token
      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token })
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// FETCH CURRENT USER (FROM BACKEND DB)
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token =
        state.auth.user?.token ||
        JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const res = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // DB USER
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

// FETCH ALL USERS
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token =
        state.auth.user?.token ||
        JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found.");
      }

      const res = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch users."
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  return true;
});

/* ========================
   SLICE
======================== */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    users: [],
    isAuthenticated: !!localStorage.getItem("user"),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          token: action.payload.token,
        };
        state.isAuthenticated = true;
      })

      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          token: action.payload.token,
        };
        state.isAuthenticated = true;
      })

      // FETCH CURRENT USER
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...action.payload,        // DB user
          token: state.user?.token, // keep token
        };
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
      })

      // FETCH ALL USERS
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.users = [];
        state.error = null;
      });
  },
});

export default authSlice.reducer;
