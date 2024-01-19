import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';



const initialState = {
    events: [],
  }
  
export const journeeajdSlice = createSlice({
    name: 'events',
    initialState,
    reducers:{
      ajouter: (state, actions) => {
        const infoseventquiarrivent = actions.payload;
        var ajd = ''
        var decalagesiJdecale = ''
        if (infoseventquiarrivent[0] == true){
          ajd  = moment().format('YYYY-MM-DD');
        }
        if (infoseventquiarrivent[0] == false){
          ajd = moment().add(1, 'day').format('YYYY-MM-DD');
        }
        const number_du_J = infoseventquiarrivent[6]
        var couleur = '#AE07B6'

        if (infoseventquiarrivent[7] !== ''){
          couleur = '#AE07B6'
          decalagesiJdecale = '+' + infoseventquiarrivent[7]
        }else{
          decalagesiJdecale = ''
          if (number_du_J == 0){
            var couleur = '#D15600'
          }
          if (number_du_J == 1){
            var couleur = '#D18D00'
          }
          if (number_du_J == 2){
            var couleur = '#CBD100'
          }
          if (number_du_J == 3){
            var couleur = '#84D100'
          }
          if (number_du_J == 4){
            var couleur = '#1AD100'
          }
          if (number_du_J == 5){
            var couleur = '#00C747'
          }
          if (number_du_J == 6){
            var couleur = '#00C78D'
          }
          if (number_du_J == 7){
            var couleur = '#00B5C7'
          }
          if (number_du_J == 8){
            var couleur = '#006BC7'
          }
          if (number_du_J == 9){
            var couleur = '#001CC7'
          }
        }
        const newEvent = {
          id : infoseventquiarrivent[3] + infoseventquiarrivent[4] + infoseventquiarrivent[5] + infoseventquiarrivent[0]+ infoseventquiarrivent[1] + infoseventquiarrivent[2],
          title: 'J' + '_'+ infoseventquiarrivent[3]+ decalagesiJdecale + '_' +infoseventquiarrivent[4] + '_' + 'cours' + '_' +infoseventquiarrivent[5],
          start: ajd  +' '+ infoseventquiarrivent[1],
          end: ajd  + ' ' +infoseventquiarrivent[2],
          color: couleur,
        }
        state.events.push(newEvent)
      },
      retirer: (state, actions) => {
        const idaenleverquiarrive = actions.payload;

        listeaTrier = [...state.events]
        nouvelleListe = listeaTrier.filter(event => event.id !== idaenleverquiarrive)
        state.events = nouvelleListe
      },
      modifier: (state, actions) => {
        const infoseventquiarrivent = actions.payload;
        var ajd = ''
        const idEventaModifier  = infoseventquiarrivent[0]

        if (infoseventquiarrivent[3]==false){
          ajd  = moment().format('YYYY-MM-DD');
        }
        if (infoseventquiarrivent[3]==true){
          ajd = moment().add(1, 'day').format('YYYY-MM-DD');
        }

        const newStart = ajd + ' ' + infoseventquiarrivent[1]
        const newEnd = ajd + ' ' + infoseventquiarrivent[2]

        listeaTrier = [...state.events]
        eventsLocal = listeaTrier.map(event => event.id === idEventaModifier ? {...event, start: newStart, end: newEnd} : event );
        state.events = eventsLocal
      },
      vider: (state, actions) => {
        console.log(state.events)
      }
  },
})