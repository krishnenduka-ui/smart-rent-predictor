import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import api from '../../api/axiosInstance'


//Register

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(userData,thunkAPI)=>{
        try {
            const response = await api.post("auth/register",userData)
            if(response.data.error){
                return rejecteWithValue(response.data.error)
            }
            
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || error.message)
            
        }
    }
)


//Login
export const loginUser = createAsyncThunk(
    "auth.loginUser",
    async(userData,thunkAPI)=>{
        try {
            const response = await api.post("auth/login",userData)
            if(response.data.error){
                return rejectWithValue(response.data.error)
            }
            
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user)
        )
        return response.data
            
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || error.message
            )
            
        }
    }
)