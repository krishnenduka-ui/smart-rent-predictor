import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from './slices/propertySlice'
import authReducer from './slices/authSlice'
import compareReducer from './slices/compareSlice'
import favoriteReducer from './slices/favoriteSlice'
import bookingReducer from './slices/bookingSlice'
import analyticsReducer from './slices/analyticsSlice'
export const store = configureStore({
    reducer:{
        properties:propertyReducer,
        auth:authReducer,
        compare:compareReducer,
        favorites:favoriteReducer,
        booking:bookingReducer,
        analytics:analyticsReducer
    }
})