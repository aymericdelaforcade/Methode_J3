import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState = {
    dernierJour: '01-01-2022'
  }
  
export const JourpourActualiserSlice = createSlice({
    name: 'dernierJour',
    initialState,
    reducers:{
        actualiser : (state, actions) => {
            state.dernierJour =  moment(new Date()).format("DD-MM-YYYY")
        }
  },
})