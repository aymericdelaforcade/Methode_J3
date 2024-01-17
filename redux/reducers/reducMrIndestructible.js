import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    indestructible: false,
  }
  
export const IndestructibleSlice = createSlice({
    name: 'indestructible',
    initialState,
    reducers:{
    activer: (state, actions) => {
        state.indestructible = true
    },
    desactiver: (state, actions) => {
        state.indestructible = false
    },
  },
})