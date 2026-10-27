import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   AXIOS BASE CONFIG - UPDATED FOR PRODUCTION
========================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

/* =========================
   THUNKS - FIXED TO SEND JSON
========================= */
export const fetchAdminBlogs = createAsyncThunk(
  "adminBlog/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/adminblog");
      console.log("✅ Fetch Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Fetch Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAdminBlog = createAsyncThunk(
  "adminBlog/create",
  async (data, { rejectWithValue }) => {
    try {
      console.log("📤 Creating blog with data:", data);
      
      // Send as JSON, not FormData
      const res = await api.post("/adminblog", data);
      console.log("✅ Create Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Create Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAdminBlog = createAsyncThunk(
  "adminBlog/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📤 Updating blog with id:", id, "and data:", data);
      
      // Send as JSON, not FormData
      const res = await api.put(`/adminblog/${id}`, data);
      console.log("✅ Update Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Update Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAdminBlog = createAsyncThunk(
  "adminBlog/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/adminblog/${id}`);
      console.log("✅ Delete Success:", id);
      return id;
    } catch (error) {
      console.error("❌ Delete Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* =========================
   SLICE - FIXED DATA HANDLING
========================= */
const adminBlogSlice = createSlice({
  name: "adminBlog",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchAdminBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchAdminBlogs.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Handle both response formats
        if (action.payload && action.payload.success && action.payload.data) {
          state.posts = Array.isArray(action.payload.data) 
            ? action.payload.data 
            : [];
        } else if (Array.isArray(action.payload)) {
          state.posts = action.payload;
        } else {
          state.posts = [];
        }
        console.log("✅ Posts loaded:", state.posts.length);
      })
      .addCase(fetchAdminBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.posts = [];
        console.error("❌ Fetch rejected:", state.error);
      })

      /* CREATE */
      .addCase(createAdminBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createAdminBlog.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Extract data from response
        const newPost = action.payload && action.payload.success 
          ? action.payload.data 
          : action.payload;
        
        if (newPost) {
          state.posts.unshift(newPost);
          state.successMessage = "Blog post created successfully!";
          console.log("✅ Post created:", newPost.title);
        }
      })
      .addCase(createAdminBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("❌ Create rejected:", state.error);
      })

      /* UPDATE */
      .addCase(updateAdminBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateAdminBlog.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Extract data from response
        const updatedPost = action.payload && action.payload.success 
          ? action.payload.data 
          : action.payload;
        
        if (updatedPost && updatedPost._id) {
          state.posts = state.posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          );
          state.successMessage = "Blog post updated successfully!";
          console.log("✅ Post updated:", updatedPost.title);
        }
      })
      .addCase(updateAdminBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("❌ Update rejected:", state.error);
      })

      /* DELETE */
      .addCase(deleteAdminBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteAdminBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
        state.successMessage = "Blog post deleted successfully!";
        console.log("✅ Post deleted:", action.payload);
      })
      .addCase(deleteAdminBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("❌ Delete rejected:", state.error);
      });
  },
});

export const { clearMessages, clearError, clearSuccessMessage } = adminBlogSlice.actions;

export default adminBlogSlice.reducer;