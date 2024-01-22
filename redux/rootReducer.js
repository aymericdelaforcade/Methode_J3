import { combineReducers } from 'redux';
import { counterSlice } from "./reducers/reducmatiere2"
import { listeSlice } from "./reducers/reducListeJ";
import { StockageSlice } from "./reducers/reducStockageJ";
import { journeeajdSlice } from "./reducers/reducMajournéeajd";
import { nbJajdSlice } from "./reducers/reducNbJajd";
import { JourpourActualiserSlice } from "./reducers/reducJourpourActualiser";
import { IndestructibleSlice } from './reducers/reducMrIndestructible';
import { informationaAfficherSlice } from './reducers/reducpourInforaAfficher';
import { CouleuraAfficherSlice } from './reducers/reducCouleuraAfficher';
import { DarkModeSlice } from './reducers/reducDarkMode';
import { PremiumSlice } from './reducers/reducPremium';

const rootReducer = combineReducers({
  matiere: counterSlice.reducer,
  liste: listeSlice.reducer,
  stockage_des_J: StockageSlice.reducer,
  events: journeeajdSlice.reducer,
  nbJajd: nbJajdSlice.reducer,
  dernierJour: JourpourActualiserSlice.reducer,
  indestructible: IndestructibleSlice.reducer,
  informationaAfficher: informationaAfficherSlice.reducer,
  CouleuraAfficher: CouleuraAfficherSlice.reducer,
  Test: DarkModeSlice.reducer, 
  Premium: PremiumSlice.reducer
});

export default rootReducer;