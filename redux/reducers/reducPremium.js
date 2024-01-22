import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Premium: false,
  }
  
export const PremiumSlice = createSlice({
    name: 'Premium',
    initialState,
    reducers:{
    activerPremium: (state, actions) => {
        state.Premium = true
    },
  },
})
