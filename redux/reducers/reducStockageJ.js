import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';
import { informationaAfficherSlice } from "./reducpourInforaAfficher";




// Absolument vérifier que si un J entre dans pas faire ou fait il faut absolument l'enlever des J reportés, car rien ne le fait
// A CHAQUE FOIS QU UN J EST MARQUE FAIT OU NE PAS FAIRE NUMERO J EST VIDE SAUF POUR J DECALEE

const initialState = {
    stockage_des_J: {},
  }
  
export const StockageSlice = createSlice({
    name: 'stockage_des_J',
    initialState,
    reducers:{
      ajouter: (state, actions) => {
        const stockage_des_J_qui_arrive = actions.payload;

        for (const id in state.stockage_des_J) {
          if (state.stockage_des_J.hasOwnProperty(id) && state.stockage_des_J[id].jour_séléctionné === "") {
            delete state.stockage_des_J[id];
          }
        }

        const id = Object.keys(stockage_des_J_qui_arrive)[0];
        state.stockage_des_J[id] = Object.assign({}, stockage_des_J_qui_arrive[id]);
      },
      ajouter_dans_liste_fait: (state, actions) => {
        const id_qui_arrive = actions.payload;
        if (id_qui_arrive[3] !== ''){ //on vérifie que le J validée est un J reportée ou pas
          const Jadeplacer  = state.stockage_des_J[id_qui_arrive[0]].date_reportée.find(obj => obj.numeroJ === id_qui_arrive[2])
          const JadeplacerCopie = {...Jadeplacer} //permet de ne pas modifier directement date
          const ajd =  moment(new Date()).format("DD-MM-YYYY")
          if (!state.stockage_des_J[id_qui_arrive[0]].date_reportée_fait.some(obj => obj.numeroJ === id_qui_arrive[2])){
            JadeplacerCopie.jour = ajd
            state.stockage_des_J[id_qui_arrive[0]].date_reportée_fait.push(JadeplacerCopie) //on ajoute le J dans la colone des J déplacés fait   
            const index = state.stockage_des_J[id_qui_arrive[0]].date_reportée.findIndex(obj => obj.numeroJ === id_qui_arrive[2]); //on fait gaffe à du coup le retirer de la colone des J reportées
            if (index !== -1) {
              state.stockage_des_J[id_qui_arrive[0]].date_reportée.splice(index, 1);
            }
          }
          const number_du_J = state.stockage_des_J[id_qui_arrive[0]].liste_choisie.indexOf(id_qui_arrive[2])
          if (!state.stockage_des_J[id_qui_arrive[0]].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == '')) {
            state.stockage_des_J[id_qui_arrive[0]].J_fait.push({numberduJ : number_du_J, numeroJ: ''});
          }

        }else{
          state.stockage_des_J[id_qui_arrive[0]].J_fait.push({numberduJ : id_qui_arrive[1], numeroJ: id_qui_arrive[2]});
        }
      },
      retirer_dans_liste_fait: (state, actions) => {
        const id_qui_arrive = actions.payload;
        const liste_J_fait_local = [...state.stockage_des_J[id_qui_arrive[0]].J_fait]
        const liste_des_J_fait_miseàjour = liste_J_fait_local.filter(J => J.numberduJ !== id_qui_arrive[1]);
        state.stockage_des_J[id_qui_arrive[0]].J_fait = liste_des_J_fait_miseàjour;

        if (id_qui_arrive[3] !== ''){ //si c'est un J décalé fait qui arrive, instructions supplémentaires
          date_reportée_fait_à_jour = state.stockage_des_J[id_qui_arrive[0]].date_reportée_fait.filter(obj => obj.numeroJ !== id_qui_arrive[2])
          state.stockage_des_J[id_qui_arrive[0]].date_reportée_fait = date_reportée_fait_à_jour
          const number_du_J = state.stockage_des_J[id_qui_arrive[0]].liste_choisie.indexOf(id_qui_arrive[2])
          const liste_J_fait_local = [...state.stockage_des_J[id_qui_arrive[0]].J_fait]
          const liste_des_J_fait_miseàjour = liste_J_fait_local.filter(J => J.numberduJ !== number_du_J);
          state.stockage_des_J[id_qui_arrive[0]].J_fait = liste_des_J_fait_miseàjour;
        }
      },
      retirer_dans_liste_pas_faire : (state, actions) => {
        const id_qui_arrive = actions.payload;

        if (id_qui_arrive[3] !== ''){ //si c'est un J décalé fait qui arrive, instructions supplémentaires
          const date_reportée_pas_fait_à_jour = state.stockage_des_J[id_qui_arrive[0]].date_reportée_pas_faire.filter(obj => obj.numeroJ !== id_qui_arrive[2])
          state.stockage_des_J[id_qui_arrive[0]].date_reportée_pas_faire = date_reportée_pas_fait_à_jour
          const number_du_J = state.stockage_des_J[id_qui_arrive[0]].liste_choisie.indexOf(id_qui_arrive[2])
          const liste_J_fait_local = [...state.stockage_des_J[id_qui_arrive[0]].pas_faire]
          const liste_des_J_pas_fait_miseàjour = liste_J_fait_local.filter(J => J.numberduJ !== number_du_J);
          state.stockage_des_J[id_qui_arrive[0]].pas_faire = liste_des_J_pas_fait_miseàjour;
        }else{
          const liste_des_J_non_fait_miseàjour = state.stockage_des_J[id_qui_arrive[0]].pas_faire.filter(J => J.numberduJ !== id_qui_arrive[1] && J.numeroJ !== id_qui_arrive[2]);
          state.stockage_des_J[id_qui_arrive[0]].pas_faire = liste_des_J_non_fait_miseàjour;
        }
      },
      ajouter_dans_liste_pas_faire : (state, actions) => {
        const id_qui_arrive = actions.payload;

        if (id_qui_arrive[3] !== ''){ //on vérifie que le J validée est un J reportée ou pas
          const Jadeplacer  = state.stockage_des_J[id_qui_arrive[0]].date_reportée.find(obj => obj.numeroJ === id_qui_arrive[2])
          const JadeplacerCopie = {...Jadeplacer} //permet de ne pas modifier directement date
          const ajd =  moment(new Date()).format("DD-MM-YYYY")
          if (!state.stockage_des_J[id_qui_arrive[0]].date_reportée_pas_faire.some(obj => obj.numeroJ === id_qui_arrive[2])){
            JadeplacerCopie.jour = ajd
            state.stockage_des_J[id_qui_arrive[0]].date_reportée_pas_faire.push(JadeplacerCopie) //on ajoute le J dans la colone des J déplacés fait   
            const index = state.stockage_des_J[id_qui_arrive[0]].date_reportée.findIndex(obj => obj.numeroJ === id_qui_arrive[2]); //on fait gaffe à du coup le retirer de la colone des J reportées
            if (index !== -1) {
              state.stockage_des_J[id_qui_arrive[0]].date_reportée.splice(index, 1);
            }
          }
          const number_du_J = state.stockage_des_J[id_qui_arrive[0]].liste_choisie.indexOf(id_qui_arrive[2])
          if (!state.stockage_des_J[id_qui_arrive[0]].pas_faire.some(element => element.numberduJ == number_du_J && element.numeroJ == '')) {
            state.stockage_des_J[id_qui_arrive[0]].pas_faire.push({numberduJ : number_du_J, numeroJ: ''});
          }

        }else{
          state.stockage_des_J[id_qui_arrive[0]].pas_faire.push({numberduJ : id_qui_arrive[1], numeroJ: id_qui_arrive[2]});
        }

      },
      ajouter_liste_date_reportée: (state, actions) => {
        const id_qui_arrive = actions.payload; 
          
        /*const array_local = state.stockage_des_J[id_qui_arrive[0]].date_reportée.filter(item => item.numeroJ !== id_qui_arrive[2]);
        array_local.push({decalage : id_qui_arrive[1], numeroJ: id_qui_arrive[2], numberduJ: id_qui_arrive[3]});
        state.stockage_des_J[id_qui_arrive[0]].date_reportée = array_local*/
       /* state.stockage_des_J[id_qui_arrive[0]].date_reportée.push({decalage : id_qui_arrive[1]})*/

       /*state.stockage_des_J[id_qui_arrive[0]].date_reportée.filter(item => item.numberduJ !== id_qui_arrive[1]);
       if (!state.stockage_des_J[id_qui_arrive[0]].date_reportée.some(item => item.numberduJ === id_qui_arrive[1] && item.numeroJ === id_qui_arrive[2])){
        state.stockage_des_J[id_qui_arrive[0]].date_reportée.push({decalage: id_qui_arrive[1], numberduJ : id_qui_arrive[1], numeroJ: id_qui_arrive[2]});
      }*/ //CODE QUI MARCHE MAIS PAS FORCEMENT OPTI (va provoquer trop de mise à jour)

        if (state.stockage_des_J[id_qui_arrive[0]].date_reportée.some(item => item.numberduJ === id_qui_arrive[3] && item.decalage === id_qui_arrive[1])){
          //si y'a déjà le number du J et le même décalage, on touche à rien
        }else{
          const date_reportée_à_jour = state.stockage_des_J[id_qui_arrive[0]].date_reportée.filter(obj => obj.numberduJ !== id_qui_arrive[3]);
          state.stockage_des_J[id_qui_arrive[0]].date_reportée = date_reportée_à_jour
          state.stockage_des_J[id_qui_arrive[0]].date_reportée.push({decalage : id_qui_arrive[1], numeroJ: id_qui_arrive[2], numberduJ : id_qui_arrive[3]});
        }

        // code de chat gpt, 19/19/23, j'ai rien compris au code
        // Utiliser reduce pour vérifier s'il y a 2 ou plus d'éléments avec le même numberduJ
        const hasDuplicateNumberduJ = state.stockage_des_J[id_qui_arrive[0]].date_reportée.reduce((accumulator, currentItem) => {
          if (!accumulator[currentItem.numberduJ]) {
            accumulator[currentItem.numberduJ] = 1;
          } else {
            accumulator[currentItem.numberduJ]++;
          }
          return accumulator;
        }, {});

        // Vérifier si l'objet hasDuplicateNumberduJ contient des clés avec une valeur supérieure ou égale à 2
        if (Object.values(hasDuplicateNumberduJ).some(count => count >= 2)) {
          const date_reportée_à_jour = state.stockage_des_J[id_qui_arrive[0]].date_reportée.filter(obj => obj.numberduJ !== id_qui_arrive[3]);
          state.stockage_des_J[id_qui_arrive[0]].date_reportée = date_reportée_à_jour
          state.stockage_des_J[id_qui_arrive[0]].date_reportée.push({decalage : id_qui_arrive[1], numeroJ: id_qui_arrive[2], numberduJ : id_qui_arrive[3]});
        }


      },
      retirer_liste_date_reportée: (state, actions) => {
        const id_et_date_qui_arrive = actions.payload;
        const date_reportée_mise_à_jour = state.stockage_des_J[id_et_date_qui_arrive[0]].date_reportée.filter(date => date !== id_et_date_qui_arrive[1])
        state.stockage_des_J[id_et_date_qui_arrive[0]].date_reportée = date_reportée_mise_à_jour
      },
      vider_stockage_des_J: (state, actions) => {
        state.stockage_des_J = ''
      },

      supprimer_le_J: (state, actions) => {
        const item_qui_arrive = actions.payload

        state.stockage_des_J[item_qui_arrive]={
          'jour_séléctionné': '',
          'matière_séléctionnée': '',
          'numéro_du_J': '',
          'liste_choisie': '',
          'nomFicheChoisit':'',
          'J_fait': [],
          'pas_faire': [],
          'date_reportée': [],
          'date_reportée_fait':[],
          'date_reportée_pas_faire': [],
        }
      },

      changerNomFiche: (state, actions) => {
        const nomquiArrive = actions.payload

        state.stockage_des_J[nomquiArrive[0]].nomFicheChoisit = nomquiArrive[1]
      },

      SupprimerMatière: (state, actions) => {
        const Matièrequiarrive = actions.payload

        for (var id in state.stockage_des_J) {
          if(state.stockage_des_J[id].matière_séléctionnée === Matièrequiarrive){
            state.stockage_des_J[id]={
              'jour_séléctionné': [],
              'matière_séléctionnée': '',
              'numéro_du_J': '',
              'liste_choisie': '',
              'nomFicheChoisit':'',
              'J_fait': [],
              'pas_faire': [],
              'date_reportée': [],
              'date_reportée_fait':[],
              'date_reportée_pas_faire': [],
            }
          }

        }
      },
      RajouterJ: (state, actions) => {
        const Infosquiarrivent = actions.payload

        state.stockage_des_J[Infosquiarrivent[0]].jour_séléctionné.push(Infosquiarrivent[1])

      },
  },
})