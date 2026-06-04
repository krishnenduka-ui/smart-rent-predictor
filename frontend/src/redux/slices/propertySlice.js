import { createSlice } from "@reduxjs/toolkit";
import {fetchProperties,
        addProperty,
        deleteProperty,
        getSingleProperty,
        updateProperty } from "../thunks/propertyThunks";


const initialState = {
    properties:[],
    singleProperty:null,
    loading:false,
    error:null
}

const propertySlice = createSlice({
    name:"properties",
    initialState,
    reducers:{},

    extraReducers:(builder) =>{
        builder
        //fetch properties
        .addCase(fetchProperties.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(fetchProperties.fulfilled,(state,action)=>{
            state.loading = false
            state.properties = action.payload
        })
        .addCase(fetchProperties.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        //Add property
        .addCase(addProperty.pending,(state)=>{
            state.loading =true
            state.error=null
        })
        .addCase(addProperty.fulfilled,(state,action)=>{
            state.loading = false
            state.properties.push(action.payload.property)
        })
        .addCase(addProperty.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })



        //Delete property
        .addCase(deleteProperty.pending,(state)=>{
            state.loading =true
            state.error=null
        })
        .addCase(deleteProperty.fulfilled,(state,action)=>{
            state.loading = false
            state.properties = state.properties.filter(
                (property) => property._id !== action.payload
            )
        })
        .addCase(deleteProperty.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })


        //Get single property
        .addCase(getSingleProperty.pending,(state)=>{
            state.loading =true
            state.error=null
        })
        .addCase(getSingleProperty.fulfilled,(state,action)=>{
            state.loading = false
            state.singleProperty = action.payload
        })
        .addCase(getSingleProperty.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })


        //Update property
        .addCase(updateProperty.pending,(state)=>{
            state.loading =true
            state.error=null
        })
        .addCase(updateProperty.fulfilled, (state, action) => {
            state.loading = false
            state.properties = state.properties.map((property) => property._id === action.payload._id ? action.payload : property );
            state.singleProperty = action.payload
        }) 
        .addCase(updateProperty.rejected, (state, action) => { 
            state.loading = false 
            state.error = action.payload 
        })
    }
})


export default propertySlice.reducer