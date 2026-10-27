import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api",
  withCredentials: true,
  timeout: 15000,
  // ⚠️ Do NOT set Content-Type here — FormData needs browser to set boundary automatically
});

// Attach admin token to every request
api.interceptors.request.use((config) => {
  const adminInfo  = localStorage.getItem("adminInfo");
  const adminToken = localStorage.getItem("adminToken");

  let token = null;

  if (adminToken) {
    token = adminToken;
  } else if (adminInfo) {
    try {
      const parsed = JSON.parse(adminInfo);
      token = parsed.token;
    } catch (e) {}
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   THUNKS — CRUD
========================= */

/* ── FETCH ALL ───────────────────────────────────────── */
export const fetchGames = createAsyncThunk(
  "admingame/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admingames");
      console.log("Fetch games response:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Fetch games error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch games"
      );
    }
  }
);

/* ── FETCH BY ID ─────────────────────────────────────── */
export const fetchGameById = createAsyncThunk(
  "admingame/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admingames/game/${id}`);
      return res.data;
    } catch (err) {
      console.error("❌ Fetch game by ID error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch game"
      );
    }
  }
);

/* ── ADD GAME ────────────────────────────────────────── */
export const addGame = createAsyncThunk(
  "admingame/add",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      console.log("📤 Adding game");
      const res = await api.post("/admingames", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 0, // no timeout — ZIP uploads can be large
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          dispatch(setUploadProgress(percent));
        },
      });
      console.log("✅ Add game response:", res.data);
      dispatch(setUploadProgress(0));
      return res.data;
    } catch (err) {
      console.error("❌ Add game error:", err.response?.data || err.message);
      dispatch(setUploadProgress(0));
      return rejectWithValue(
        err.response?.data?.message || err.message || "Upload failed"
      );
    }
  }
);

/* ── UPDATE GAME ─────────────────────────────────────── */
export const updateGame = createAsyncThunk(
  "admingame/update",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      console.log(`📤 Updating game ID: ${id}`);
      const res = await api.put(`/admingames/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 0,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          dispatch(setUploadProgress(percent));
        },
      });
      console.log("✅ Update game response:", res.data);
      dispatch(setUploadProgress(0));
      return res.data;
    } catch (err) {
      console.error("❌ Update game error:", err.response?.data || err.message);
      dispatch(setUploadProgress(0));
      return rejectWithValue(
        err.response?.data?.message || err.message || "Update failed"
      );
    }
  }
);

/* ── DELETE GAME ─────────────────────────────────────── */
export const deleteGame = createAsyncThunk(
  "admingame/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`🗑️ Deleting game ID: ${id}`);
      await api.delete(`/admingames/${id}`);
      return id;
    } catch (err) {
      console.error("❌ Delete game error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Delete failed"
      );
    }
  }
);

/* =========================
   THUNKS — TOGGLES
========================= */

/* ── TOGGLE FEATURED ─────────────────────────────────── */
export const toggleGameFeatured = createAsyncThunk(
  "admingame/toggleFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/admingames/${id}/featured`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Toggle featured failed"
      );
    }
  }
);

/* ── TOGGLE STATUS (active / inactive) ───────────────── */
export const toggleGameStatus = createAsyncThunk(
  "admingame/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/admingames/${id}/status`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Toggle status failed"
      );
    }
  }
);

/* =========================
   HELPER: merge updated game into games array
========================= */
const mergeGame = (games, updated) => {
  const index = games.findIndex((g) => g._id === updated._id);
  if (index !== -1) {
    games[index] = updated;
  }
};

/* =========================
   SLICE
========================= */
const adminGameSlice = createSlice({
  name: "admingame",
  initialState: {
    games: [],
    currentGame: null,
    loading: false,
    error: null,
    successMessage: null,
    uploadProgress: 0,
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
    resetGames: (state) => {
      state.games = [];
      state.currentGame = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      state.uploadProgress = 0;
    },
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ── FETCH ALL ─────────────────────── */
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.games = action.payload;
        } else if (action.payload?.data && Array.isArray(action.payload.data)) {
          state.games = action.payload.data;
        } else {
          state.games = [];
        }
        state.error = null;
        console.log(`✅ Games loaded: ${state.games.length}`);
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load games";
        state.games = [];
      })

      /* ── FETCH BY ID ───────────────────── */
      .addCase(fetchGameById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame =
          action.payload?.data || action.payload;
        state.error = null;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load game";
        state.currentGame = null;
      })

      /* ── ADD ───────────────────────────── */
      .addCase(addGame.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
        state.uploadProgress = 0;
      })
      .addCase(addGame.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadProgress = 0;
        const newGame = action.payload?._id
          ? action.payload
          : action.payload?.data || action.payload;

        if (newGame?._id) {
          state.games.unshift(newGame);
          state.successMessage = "✅ Game added successfully!";
        }
        state.error = null;
      })
      .addCase(addGame.rejected, (state, action) => {
        state.loading = false;
        state.uploadProgress = 0;
        state.error = action.payload || "Failed to add game";
      })

      /* ── UPDATE ────────────────────────── */
      .addCase(updateGame.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
        state.uploadProgress = 0;
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadProgress = 0;
        const updated = action.payload?._id
          ? action.payload
          : action.payload?.data || action.payload;

        if (updated?._id) {
          mergeGame(state.games, updated);
          if (state.currentGame?._id === updated._id) {
            state.currentGame = updated;
          }
          state.successMessage = "✅ Game updated successfully!";
        }
        state.error = null;
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.loading = false;
        state.uploadProgress = 0;
        state.error = action.payload || "Failed to update game";
      })

      /* ── DELETE ────────────────────────── */
      .addCase(deleteGame.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.loading = false;
        state.games = state.games.filter((g) => g._id !== action.payload);
        if (state.currentGame?._id === action.payload) {
          state.currentGame = null;
        }
        state.successMessage = "✅ Game deleted successfully!";
        state.error = null;
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete game";
      })

      /* ── TOGGLE FEATURED ───────────────── */
      .addCase(toggleGameFeatured.fulfilled, (state, action) => {
        const updated = action.payload;
        if (updated?._id) mergeGame(state.games, updated);
      })

      /* ── TOGGLE STATUS ─────────────────── */
      .addCase(toggleGameStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        if (updated?._id) mergeGame(state.games, updated);
      });
  },
});

export const {
  clearMessages,
  clearError,
  clearSuccessMessage,
  resetGames,
  setCurrentGame,
  setUploadProgress,
} = adminGameSlice.actions;

export default adminGameSlice.reducer;