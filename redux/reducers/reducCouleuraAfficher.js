import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    CouleuraAfficher: true, //true = afficher couleur matière, false= afficher couleur J
  }
  
export const CouleuraAfficherSlice = createSlice({
    name: 'CouleuraAfficher',
    initialState,
    reducers:{
    CouleurMatiere: (state, actions) => {
        state.CouleuraAfficher = true
    },
    CouleurJ: (state, actions) => {
        state.CouleuraAfficher = false
    },
  },
})