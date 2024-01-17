import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    liste: [[0,1,3,5,7,14,30,45,90,120]],
  }
  
export const listeSlice = createSlice({
    name: 'liste',
    initialState,
    reducers:{
      increment: (state, actions) => {
        const liste_input = actions.payload;
        state.liste.push(liste_input);
      },
      supp: (state, actions) => {
        state.liste= [[0,1,3,5,7,14,30,45]]
      },
      supprimerListe: (state, actions) => {
        const liste_qui_arrrive = actions.payload;
        function arraysEqual(arr1, arr2) {
          if (arr1.length !== arr2.length) return false;
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
          }
          return true;
        }

        const nouveauTableauPrincipal = state.liste.filter(tableau => !arraysEqual(tableau, liste_qui_arrrive));

        state.liste = nouveauTableauPrincipal



      }
  },
})