import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import adminUserReducer from "../redux/slices/adminUserSlice";
import adminGalleryReducer from "../redux/slices/adminGallerySlice";
import adminDashboardReducer from "../redux/slices/adminDashboardSlice";
import adminBlogReducer from "../redux/slices/adminBlogSlice";
import adminGameReducer from "../redux/slices/adminGameSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUsers: adminUserReducer, 
    gallery: adminGalleryReducer,
    dashboard: adminDashboardReducer,
    adminBlog: adminBlogReducer, 
    admingame: adminGameReducer,
  },
});