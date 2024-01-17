import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    CouleurFond: '#121212',
    CouleurBouton: '#353535',
    CouleurBouton2: '#4F4F4F', //Correspond aux couleurs du bouton nombre J à faire
    CouleurText: '#D6D6D6', //Couleur Text
    Dark: true,
    CouleurActive: '#bb86fc', //va être violet et bleu - peut être utilisé pour les switch on
    CouleurSwitchOff: '#353535'
  }
  
export const DarkModeSlice = createSlice({
    name: 'DarkMode',
    initialState,
    reducers:{
    LightMode: (state, actions) => {
        state.Dark = false,
        state.CouleurFond = '#EAEAEA',
        state.CouleurBouton = '#789AFF',
        state.CouleurBouton2 = '#78BBD0',
        state.CouleurText = '#000000'
        state.CouleurActive = '#789AFF'
        state.CouleurSwitchOff = '#DEDEDE'
    },
    DarkMode: (state, actions) => {
        state.Dark = true,
        state.CouleurFond = '#121212',
        state.CouleurBouton = '#353535',
        state.CouleurText = '#C9C9C9'
        state.CouleurBouton2  = '#4F4F4F'
        state.CouleurActive = '#bb86fc'
        state.CouleurSwitchOff = '#353535'
    },
  },
})