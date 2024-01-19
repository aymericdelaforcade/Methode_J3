import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    matiere: [],
  }
  
export const counterSlice = createSlice({
    name: 'matiere',
    initialState,
    reducers:{
      increment: (state, actions) => {
        const matiere_input = actions.payload;
        state.matiere.push([matiere_input[0], matiere_input[1]]);
      },
      supprimer: (state, actions) => {
        const matieresupp = actions.payload;
        const matiereajour = state.matiere.filter(item => (Array.isArray(item) ? item[0] !== matieresupp : item !== matieresupp)); //permet de vérifier si c'est un array qu'il faut supp ou matière seule
        state.matiere = matiereajour
      },
      modifier: (state, actions) => {
        const matiereaModifier = actions.payload;

        console.log(state.matiere + 'state')

        const indexàmodif = state.matiere.findIndex(item => item[0] === matiereaModifier[0])
        let copiematiere = [...state.matiere]
        copiematiere[indexàmodif]= [matiereaModifier[1], matiereaModifier[2]]
        state.matiere = copiematiere
      },

      /*ajoutTest: (state, actions) => {
        const matiere_input = actions.payload;
        state.matiere.push('Matière seule');
      },*/

      miseenformeNouvelle: (state, actions) => {
        const statecorrect = state.matiere.map(item => (Array.isArray(item) ? item : [item, '#78BBD0']));
        state.matiere = statecorrect
      }
  },
})