import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   AXIOS BASE CONFIG
========================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

/* =========================
   ASYNC THUNKS WITH PROPER ERROR HANDLING
========================= */
export const fetchGallery = createAsyncThunk(
  "gallery/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admingallery");
      return res.data;
    } catch (error) {
      console.error("❌ Fetch gallery error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addGallery = createAsyncThunk(
  "gallery/add",
  async (data, { rejectWithValue }) => {
    try {
      console.log("📤 Adding gallery item:", data);
      const res = await api.post("/admingallery", data);
      console.log("✅ Add gallery response:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Add gallery error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateGallery = createAsyncThunk(
  "gallery/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📤 Updating gallery item:", id);
      const res = await api.put(`/admingallery/${id}`, data);
      console.log("✅ Update gallery response:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Update gallery error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteGallery = createAsyncThunk(
  "gallery/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admingallery/${id}`);
      console.log("✅ Gallery item deleted:", id);
      return id;
    } catch (error) {
      console.error("❌ Delete gallery error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleFeatured = createAsyncThunk(
  "gallery/featured",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/admingallery/${id}/featured`);
      console.log("✅ Toggle featured response:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Toggle featured error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* =========================
   GALLERY SLICE
========================= */
const adminGallerySlice = createSlice({
  name: "gallery",
  initialState: {
    items: [],
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
    },
    resetGallery: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* ========== FETCH GALLERY ========== */
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        if (action.payload && action.payload.success && action.payload.data) {
          state.items = Array.isArray(action.payload.data) 
            ? action.payload.data 
            : [];
        } else if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else {
          state.items = [];
        }
        state.error = null;
        console.log("✅ Gallery items loaded:", state.items.length);
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load gallery";
        state.items = [];
      })

      /* ========== ADD GALLERY ========== */
      .addCase(addGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addGallery.fulfilled, (state, action) => {
        state.loading = false;
        // Extract data from response
        const newItem = action.payload && action.payload.success 
          ? action.payload.data 
          : action.payload;
        
        if (newItem) {
          state.items.unshift(newItem);
          state.successMessage = "Gallery item added successfully!";
        }
        state.error = null;
      })
      .addCase(addGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add gallery item";
      })

      /* ========== UPDATE GALLERY ========== */
      .addCase(updateGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.loading = false;
        // Extract data from response
        const updatedItem = action.payload && action.payload.success 
          ? action.payload.data 
          : action.payload;
        
        if (updatedItem && updatedItem._id) {
          state.items = state.items.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          );
          state.successMessage = "Gallery item updated successfully!";
        }
        state.error = null;
      })
      .addCase(updateGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update gallery item";
      })

      /* ========== DELETE GALLERY ========== */
      .addCase(deleteGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.successMessage = "Gallery item deleted successfully!";
        state.error = null;
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete gallery item";
      })

      /* ========== TOGGLE FEATURED ========== */
      .addCase(toggleFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(toggleFeatured.fulfilled, (state, action) => {
        state.loading = false;
        // Extract data from response
        const updatedItem = action.payload && action.payload.success 
          ? action.payload.data 
          : action.payload;
        
        if (updatedItem && updatedItem._id) {
          state.items = state.items.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          );
          const isFeatured = updatedItem.featured ? "featured" : "unfeatured";
          state.successMessage = `Gallery item ${isFeatured} successfully!`;
        }
        state.error = null;
      })
      .addCase(toggleFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle featured status";
      });
  },
});

export const { 
  clearMessages, 
  clearError, 
  clearSuccessMessage, 
  resetGallery 
} = adminGallerySlice.actions;

export default adminGallerySlice.reducer;