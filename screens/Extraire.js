import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { StockageSlice } from '../redux/reducers/reducStockageJ';
import { useSelector } from 'react-redux';

import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';




export default function Extraire() {

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const stockage_des_J = useSelector((state) => state.stockage_des_J.stockage_des_J)

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();


    const dataArray = Object.keys(stockage_des_J).map(key => stockage_des_J[key]);
    const ws = XLSX.utils.aoa_to_sheet([]);

    const colWidths = [{ wch: 18 },{ wch: 14 },{ wch: 20 },{ wch: 10 },{ wch: 10 },{ wch: 5 }, ,{ wch: 20 }, ,{ wch:18 },{ wch: 18 }];
    ws['!cols'] = colWidths;

    const header = ["Nom du J", "Matière", "Nom du cours", "Numéro du cours", 'Date du J0', 'Liste choisie', 'Liste des J à faire', 'Liste des J déjà faits', 'Liste des J choisis de ne pas être faits'];
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A1' });

    /*for (let i=0; i<10; i++){
      cell.s = { fill: { fgColor: { rgb: "ff6600" } } };
    }*/
    
    let numéroLigne = 2 //commence à la ligne 2

    for (const key in stockage_des_J) {
      if (Object.hasOwnProperty.call(stockage_des_J, key)) {
        if (stockage_des_J[key].matière_séléctionnée !== ''){ //permet de ne pas mettre les matières supprimées
          const data = stockage_des_J[key];
          const dateJ0 = stockage_des_J[key].jour_séléctionné[0]
          const rowData = [
            key,
            data.matière_séléctionnée,
            data.nomFicheChoisit,
            data.numéro_du_J,
            dateJ0,
            data.liste_choisie,
            data.jour_séléctionné,
            data.J_fait,
            data.pas_faire
          ];
          XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: `A${numéroLigne}` });
          numéroLigne++;
        }
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "mes J", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "mes J.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };

    return(
      <View style={[styles.principal, {backgroundColor: CouleurFond}]}>
        <View style={styles.haut2}> 
{ /*         <TouchableOpacity style={[styles.bouton_ajouter_liste, {backgroundColor: CouleurBouton}]} onPress={() => generateExcel()}>
            <Text style={styles.la_methode_des_J_comment_ça_marche_text}>
              Extraire mes J
            </Text>
          </TouchableOpacity>*/}
          <View style={[styles.bas, {backgroundColor: CouleurFond}]}>          
            <Text style={styles.la_methode_des_J_comment_ça_marche_text}>
              En cours de développement, arrive très prochainement
            </Text>
          </View>
        </View>
        <StatusBar backgroundColor= {DarkMode ? CouleurFond : '#789AFF'} />          
      </View>
    )
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  haut:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  haut2:{
    flex: 13,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  bouton_ajouter_liste:{
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '4%',
    flexDirection: 'row',
    marginHorizontal: '4%',
    borderRadius: 22,
    borderWidth: 0,

  },
  la_methode_des_J_comment_ça_marche_text:{
    fontSize: 19,
    textAlign: 'center'
  },
  bas:{
    flex:9,
    alignItems:'center', 
    justifyContent: 'center'
  }
});

