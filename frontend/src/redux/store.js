import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from './slices/propertySlice'
import authReducer from './slices/authSlice'
import compareReducer from './slices/compareSlice'
import favoriteReducer from './slices/favoriteSlice'
import bookingReducer from './slices/bookingSlice'
export const store = configureStore({
    reducer:{
        properties:propertyReducer,
        auth:authReducer,
        compare:compareReducer,
        favorites:favoriteReducer,
        booking:bookingReducer
    }
})