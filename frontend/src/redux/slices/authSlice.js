import {createSlice} from '@reduxjs/toolkit'
import {loginUser,registerUser} from '../thunks/authThunks'
import { act } from 'react'

const user = localStorage.getItem("user") 
    ?JSON.parse(localStorage.getItem("user"))
    :null

const token = localStorage.getItem("token")

const initialState = {
    user: user || null,
    token:token || null,
    loading:false,
    error:null,
    success:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout :(state) =>{
            state.user = null
            state.token = null
            state.error = null
            state.success = null

            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
        clearMessages:(state) =>{
            state.error = null
            state.success = null
        }
    },
    extraReducers : (builder) =>{
        builder
        //register
        .addCase(registerUser.pending,(state) =>{
            state.loading = true
            state.error = null
            state.success = null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false
            state.success = action.payload.message
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })


        //Login
        .addCase(loginUser.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false

            state.user = action.payload.user
            state.token = action.payload.token

            state.success = action.payload.message
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {logout,clearMessages} = authSlice.actions

export default authSlice.reducer