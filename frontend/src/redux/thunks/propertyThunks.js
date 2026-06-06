import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/axiosInstance'

//Fetch all properties
export const fetchProperties = createAsyncThunk(
    "properties/fetchProperties",
    async (filters = {}, thunkAPI) => {
        try {
            const query = new URLSearchParams(filters).toString()

            const response = await api.get(`/property?${query}`)
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch properties")

        }

    }
)



//Add property

export const addProperty = createAsyncThunk(
    "properties/addProperty",
    async (propertyData, thunkAPI) => {
        try {
            const response = await api.post("/property", propertyData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },

            })
            return response.data

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add property"
            )

        }

    }
)


//Delete property
export const deleteProperty = createAsyncThunk(
    "properties/deleteProperty",
    async (id, thunkAPI) => {
        try {
            await api.delete(`/property/${id}`)
            return id

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete property"
            )

        }
    }
)



//Update property
export const updateProperty = createAsyncThunk(
    "properties/updateProperty",
    async ({ id, propertyData }, thunkAPI) => {
        try {
            const response = await api.put(`property/${id}`, propertyData)
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update property"
            )

        }

    }
)



//getSingle Property
export const getSingleProperty = createAsyncThunk(
    "properties/getSingleProperty",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`property/${id}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "failed to fetch property"
            )

        }
    }
)