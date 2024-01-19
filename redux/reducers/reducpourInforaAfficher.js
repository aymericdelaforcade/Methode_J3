import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    informationaAfficher: true, //true = afficher nom fiche, false == afficher Matierefiche
  }
  
export const informationaAfficherSlice = createSlice({
    name: 'informationaAfficher',
    initialState,
    reducers:{
    NomFiche: (state, actions) => {
        state.informationaAfficher = true
    },
    MatiereFiche: (state, actions) => {
        state.informationaAfficher = false
    },
  },
})