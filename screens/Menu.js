import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Image} from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import SelectDropdown from 'react-native-select-dropdown'
import { scale, verticalScale } from 'react-native-size-matters';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StatusBar } from 'expo-status-bar';





import { StockageSlice } from '../redux/reducers/reducStockageJ';
import { useSelector, useDispatch } from 'react-redux';



export default function Menu({navigation}) {

  const [nombreJajd, setnombreJajd] = useState(0)
  const [image, setimage] = useState(require('../assets/indestructible1.png'))
  const stockage_des_J_externe = useSelector((state) => state.stockage_des_J.stockage_des_J)
  const indestructible = useSelector((state) => state.indestructible.indestructible)

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)


  useEffect(() => {
    setnombreJajd(0)
    const ajd =  moment(new Date()).format("DD-MM-YYYY")
    let total = 0
    for (var id in stockage_des_J_externe) {
      if (stockage_des_J_externe.hasOwnProperty(id)) {
        var dates = stockage_des_J_externe[id].jour_séléctionné;
        var dates_decalees = stockage_des_J_externe[id].date_reportée

        const numberFaits = [] // va stocker tous les numbers du J qui ont été faits
        for (const element of stockage_des_J_externe[id].J_fait) {
            numberFaits.push(element.numberduJ);
        }
        const ListeDatesFaites = []
        
        for (const index of numberFaits){
            ListeDatesFaites.push(stockage_des_J_externe[id].jour_séléctionné[index])
        }

        if (dates.includes(ajd) && dates.indexOf(ajd) !== 0 && !ListeDatesFaites.includes(ajd)) {
          setnombreJajd(nombreJajd + 1)
        }
        setnombreJajd(nombreJajd + dates_decalees.length)
        total = nombreJajd + dates_decalees.length

      }
    }

    
    if (total == 0){
      setimage(require('../assets/indestructible1.png'))
    }
    if (total == 1){
      setimage(require('../assets/indestructible2.png'))
    }
    if (total == 2 || total == 3){
      setimage(require('../assets/indestructible3.png'))
    }
    if (total == 3 || total == 4){
      setimage(require('../assets/indestructible4.png'))
    }
    if (total == 5 || total == 6){
      setimage(require('../assets/indestructible5.png'))
    }
    if (total == 7 || total == 8){
      setimage(require('../assets/indestructible6.png'))
    }
    if (total == 9 || total == 10){
      setimage(require('../assets/indestructible7.png'))
    }
    if (total == 11 || total == 12){
      setimage(require('../assets/indestructible8.png'))
    }
    if (total == 13 || total == 14){
      setimage(require('../assets/indestructible9.png'))
    }
    if (total == 15 || total == 16){
      setimage(require('../assets/indestructible10.png'))
    }
    if (total > 16){
      setimage(require('../assets/indestructible11.png'))
    }
  }, []);

  useEffect(() => {
    setnombreJajd(0)
    const ajd =  moment(new Date()).format("DD-MM-YYYY")
    let total = 0
    for (var id in stockage_des_J_externe) {
      if (stockage_des_J_externe.hasOwnProperty(id)) {      
        var dates = stockage_des_J_externe[id].jour_séléctionné;
        var dates_decalees = stockage_des_J_externe[id].date_reportée

        const numberFaits = [] // va stocker tous les numbers du J qui ont été faits
        for (const element of stockage_des_J_externe[id].J_fait) {
            numberFaits.push(element.numberduJ);
        }
        const ListeDatesFaites = []
        
        for (const index of numberFaits){
            ListeDatesFaites.push(stockage_des_J_externe[id].jour_séléctionné[index])
        }

        if (dates.includes(ajd) && dates.indexOf(ajd) !== 0 && !ListeDatesFaites.includes(ajd)) {
          total += 1
        }
        total += dates_decalees.length
      }
    }
    setnombreJajd(total)

    if (total == 0){
      setimage(require('../assets/indestructible1.png'))
    }
    if (total == 1){
      setimage(require('../assets/indestructible2.png'))
    }
    if (total == 2 || total == 3){
      setimage(require('../assets/indestructible3.png'))
    }
    if (total == 3 || total == 4){
      setimage(require('../assets/indestructible4.png'))
    }
    if (total == 5 || total == 6){
      setimage(require('../assets/indestructible5.png'))
    }
    if (total == 7 || total == 8){
      setimage(require('../assets/indestructible6.png'))
    }
    if (total == 9 || total == 10){
      setimage(require('../assets/indestructible7.png'))
    }
    if (total == 11 || total == 12){
      setimage(require('../assets/indestructible8.png'))
    }
    if (total == 13 || total == 14){
      setimage(require('../assets/indestructible9.png'))
    }
    if (total == 15 || total == 16){
      setimage(require('../assets/indestructible10.png'))
    }
    if (total > 16){
      setimage(require('../assets/indestructible11.png'))
    }
  },[stockage_des_J_externe])

  
  const flashMessage = useRef();

  const dispatch = useDispatch();
  const matiere = useSelector((state) => state.matiere.matiere)
  const liste = useSelector((state) => state.liste.liste)


  const hideDatePicker = () => {
    setisDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setjour_sélétionné_pour_calculs(date)
    const datebienfait = moment(date).format("DD-MM-YYYY");
    setjour_sélétionné(datebienfait);
    hideDatePicker();
  };


  const onDateChange = (date, type) => {
    //sert à rien mais à laisser (senser être appelé par ondatechange)
  };

  function enregister_la_saisie_du_J(){
    let stockage_des_J = {}
    const id_du_J = jour_séléctionné +matiere_séléctionné +J_fait; //permet d'avoir une clé unique pour chaque J
    const liste_des_jours = [] // permet d'initialiser la liste des jours où ce J devra être fait

    const longueur = liste_choisie.length
    let j_numéro_5_jour = ''
    let j_numéro_6_jour = ''
    let j_numéro_7_jour = ''
    let j_numéro_8_jour = ''
    let j_numéro_9_jour = ''
    const j_numéro_1_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[1], 'days')).format('DD-MM-YYYY') // permet de calculer à quelle date doivent se faire les J1,2 et 3 (numéro)
    const j_numéro_2_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[2], 'days')).format('DD-MM-YYYY')
    const j_numéro_3_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[3], 'days')).format('DD-MM-YYYY')
    const j_numéro_4_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[4], 'days')).format('DD-MM-YYYY')
    if(longueur >= 5){
      j_numéro_5_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[5], 'days')).format('DD-MM-YYYY')
    }
    if(longueur >= 6){
      j_numéro_6_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[6], 'days')).format('DD-MM-YYYY')
    }
    if(longueur >= 7){
      j_numéro_7_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[7], 'days')).format('DD-MM-YYYY')
    }
    if(longueur >= 8){
      j_numéro_8_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[8], 'days')).format('DD-MM-YYYY')
    }

    if(longueur >= 9){
      j_numéro_9_jour = moment(moment(jour_séléctionné_pour_calculs).add(liste_choisie[9], 'days')).format('DD-MM-YYYY')
    }


    liste_des_jours.push(jour_séléctionné) // ajout du jour du J0
    liste_des_jours.push(j_numéro_1_jour) // ajout du jour du J numéro 1
    liste_des_jours.push(j_numéro_2_jour) // ajout du jour du J numéro 2
    liste_des_jours.push(j_numéro_3_jour) // ajout du jour du J numéro 3
    liste_des_jours.push(j_numéro_4_jour)
    if (longueur >= 5){
      liste_des_jours.push(j_numéro_5_jour)
    }
    if (longueur >= 6){
      liste_des_jours.push(j_numéro_6_jour)
    }
    if (longueur >= 7){
      liste_des_jours.push(j_numéro_7_jour)
    }
    if (longueur >= 8){
      liste_des_jours.push(j_numéro_8_jour)
    }
    if (longueur >= 9){
      liste_des_jours.push(j_numéro_9_jour)
    }


    stockage_des_J[id_du_J] = {
      'jour_séléctionné': liste_des_jours,
      'matière_séléctionnée': matiere_séléctionné,
      'numéro_du_J': J_fait,
      'liste_choisie': liste_choisie,
      'nomFicheChoisit': NomFicheFaite,
      'J_fait': [],
      'pas_faire': [],
      'date_reportée': [],
      'date_reportée_fait':[],
      'date_reportée_pas_faire': [],
    };

    setjour_sélétionné('Choisir date du J0');
    setmatiere_séléctionné('');
    setJ_fait('');
    
    dispatch(StockageSlice.actions.ajouter(stockage_des_J));
    
  }

  const [dialogVisible, setdialogVisible] = useState(false);//permet d'ouvrir ou de fermer la boite de dialogue qui permet d'ajouter un J fait
  const [J_fait, setJ_fait] = useState(''); // onChangeText du text input pour rentrer son J qui a été fait
  const [NomFicheFaite, setNomFicheFaite] = useState(''); // onChangeText du text input pour rentrer le nom du cours du J qui a été fait
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false); // permet d'ouvrir le calendrier
  const [jour_séléctionné, setjour_sélétionné] = useState('choisir date du J0') //permet de choisir le jour fait depuis le calendrier
  const [matiere_séléctionné, setmatiere_séléctionné] = useState('')
  const [liste_choisie, setliste_choisie] = useState('')
  const [jour_séléctionné_pour_calculs, setjour_sélétionné_pour_calculs] = useState('')

  const listeMatieressansCouleurs = matiere.map(item => item[0]);



  return (
      <View style={styles.principal}>
          <View style={[styles.haut2, {backgroundColor: CouleurFond}]}> 
            <TouchableOpacity style={[styles.nombre_de_J_à_faire_ajd_touchable, {backgroundColor:  CouleurBouton2}]} onPress={() => console.log(JSON.stringify(stockage_des_J_externe, null, 2))}>
              <View style={{flex:2, marginLeft: '2%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.nombre_de_J_à_faire_ajd_txt}>
                  {nombreJajd} J à faire aujourd'hui
                </Text>
                </View>
              {indestructible && (<View style={{flex:1, marginRight: '4%'}}>
                <Image
                    source={image}
                    style={styles.image}
                    />
              </View>)}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.la_methode_des_J_comment_ça_marche_touchable, {backgroundColor: CouleurBouton}]}onPress={() => navigation.navigate('Matières')}>
              <MaterialIcons name="format-list-bulleted" color={TextColor} size={23} style={{marginRight: '4%'}}/>
              <Text style={styles.la_methode_des_J_comment_ça_marche_text} >
                Créer une nouvelle matière
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.la_methode_des_J_comment_ça_marche_touchable, {marginTop: '0%', marginBottom:'4%', backgroundColor: CouleurBouton}]} onPress={() => navigation.navigate('Liste des J')}>
              <MaterialIcons name="format-list-numbered-rtl" color={TextColor} size={23}  style={{marginRight: '4%'}}/>
              <Text style={styles.la_methode_des_J_comment_ça_marche_text}>
                Ajouter une liste de J
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.la_methode_des_J_comment_ça_marche_touchable, {marginTop: '4%', backgroundColor: DarkMode ? CouleurActive :  CouleurBouton2}]} onPress={() => setdialogVisible(true)}>
             <Ionicons name="add" color={'black'} size={25} style={{marginRight: '4%'}}/>
              <Text style={{fontSize: 19, color: 'black'}}>
                Ajouter un J
              </Text>
            </TouchableOpacity>
            <View style={{flex : 5.6, backgroundColor: CouleurFond}}></View>
          </View>
          <ConfirmDialog
            dialogStyle = {{borderRadius : 10, backgroundColor: CouleurActive}}
            contentStyle ={{padding:0, paddingTop: 0, backgroundColor: CouleurFond}}
            buttonsStyle = {{backgroundColor: CouleurBouton, borderBottomEndRadius: 10, borderBottomLeftRadius: 10}}
            animationType="fade"
            title="Ajouter un J fait"
            titleStyle= {{textAlign: 'center', justifyContent: 'center', marginBottom: '5%', color: TextColor}}
            message="Are you sure about that?"
            keyboardShouldPersistTaps="handled"
            visible={dialogVisible}
            onTouchOutside={() => {setdialogVisible(false); setJ_fait(''); setjour_sélétionné('Choisir date du J0'); setliste_choisie(''); setmatiere_séléctionné(''), setNomFicheFaite('')}}
            positiveButton={{
                style: {color: TextColor} ,
                title: "ajouter",
                onPress: () => {
                  if (J_fait == ''  || jour_séléctionné == 'Choisir date du J0'  || matiere_séléctionné == ''  || liste_choisie =='' || NomFicheFaite == ''){
                    showMessage({ message: "Merci de remplir toutes les catégories", backgroundColor: '#FF0000', style:{alignItems: 'center', justifyContent: 'center'}})
                  }else{
                    setdialogVisible(false);
                    enregister_la_saisie_du_J();
                    setjour_sélétionné('Choisir date du J0');
                    setliste_choisie('');
                    setJ_fait('');
                    setmatiere_séléctionné('')
                    setNomFicheFaite('')
                    showMessage({ message: "J ajouté !", backgroundColor: '#1AAD00', style:{alignItems: 'center', justifyContent: 'center'}})
                  }
                }
            }}
            negativeButton={{
                style: {color: TextColor} ,
                title: "annuler",
                onPress: () => {
                  setJ_fait('');
                  setjour_sélétionné('Choisir date du J0');
                  setliste_choisie('');
                  setmatiere_séléctionné('')
                  setdialogVisible(false); 
                  setNomFicheFaite('')
                }
            }}>
            <View style={styles.view_princ_pour_add_j_fait}>
              <View style={styles.view_du_selectionnez_matiere}>
                <View style={{width: scale(130), alignItems: 'center'}}>
                  <Text style= {styles.taille_des_text}>Matière </Text>
                </View>
                <View style={{width: scale(250)}}>
                  <SelectDropdown
                      data={listeMatieressansCouleurs}
                      buttonStyle={[styles.style_bouton_dropdown_matiere, {backgroundColor: CouleurFond}]}
                      buttonTextStyle={[styles.style_du_text_du_dropdown, {color: TextColor}]}
                      defaultButtonText = 'sélectionnez une matière'
                      onSelect={(selectedItem, index) => {
                        setmatiere_séléctionné(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                        
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                      }}
                    />
                  </View>
              </View>
              <View style={styles.view_qui_enveloppe_textinput}>
                <View style={{width: scale(120), alignItems: 'center'}}>
                  <Text style= {styles.taille_des_text}>Numéro de fiche</Text>
                </View>
                <View style={{marginLeft:'20%', width: verticalScale(250)}}>
                  <TextInput 
                    keyboardType= 'numeric'
                    maxLength= {3}
                    placeholder="tapez ici"
                    value={J_fait}
                    onChangeText={setJ_fait}
                    placeholderTextColor={TextColor}
                    color= {TextColor}
                  />
                </View>
              </View>
              <View style={styles.view_qui_enveloppe_textinput}>
                <View style={{width: scale(120), alignItems: 'center'}}>
                  <Text style= {styles.taille_des_text}>Nom de la fiche</Text>
                </View>
                <View style={{marginLeft:'2%', width: verticalScale(150)}}>
                  <TextInput 
                    textAlign={'center'}
                    keyboardType= 'default'
                    maxLength= {30}
                    placeholder="tapez ici le nom du cours"
                    placeholderTextColor={TextColor}
                    color= {TextColor}
                    value={NomFicheFaite}
                    onChangeText={setNomFicheFaite}
                  />
                </View>
              </View>              
              <View style={styles.view_du_date_du_J}>
              <View style={{width: scale(140), alignItems: 'center'}}>
                <Text style= {styles.taille_des_text}>Date du J</Text>
              </View>
                <View style= {{width: scale(150), alignItems: 'center'}}>
                  <TouchableOpacity style={styles.choisir_date_J0_touchable} onPress={() => setisDatePickerVisible(true)}>
                  <Text style={{fontSize: 12}}>
                    {jour_séléctionné}
                  </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    startFromMonday = {true}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    onDateChange = {onDateChange}
                    maximumDate={new Date()}
                  />
                </View>
              </View>
              <View style={styles.view_du_selectionnez_matiere}>
                <View style={{width: scale(130), alignItems: 'center'}}>
                  <Text style= {styles.taille_des_text}>Liste de J</Text>
                </View>
                <View style={{width: scale(250)}}>
                  <SelectDropdown
                      data={liste}
                      buttonStyle={[styles.style_bouton_dropdown_matiere, {backgroundColor: CouleurFond}]}
                      buttonTextStyle={[styles.style_du_text_du_dropdown, {color: TextColor}]}
                      defaultButtonText = 'séléctionnez liste de J'
                      onSelect={(selectedItem, index) => {
                        setliste_choisie(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                        
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                      }}
                    />
                </View>
              </View>
            </View>
          </ConfirmDialog>
          <StatusBar backgroundColor= {DarkMode ? CouleurFond : '#789AFF'} />
      </View>
  );
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
    
  },

  haut2:{
    flex: 13,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  la_methode_des_J_comment_ça_marche_touchable:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2%',
    flexDirection: 'row',
    marginHorizontal: '4%',
    borderRadius: 22,
    borderWidth: 0,
  },
  la_methode_des_J_comment_ça_marche_touchable_du_bas:{
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '0.5%',
    flexDirection: 'row',
    marginHorizontal: '5%',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  nombre_de_J_à_faire_ajd_touchable:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginVertical: '3%',
    flexDirection: 'row',
    marginHorizontal: '4%',
    borderRadius: 22,
  },
  la_methode_des_J_comment_ça_marche_text:{
    fontSize: 19,
  },
  nombre_de_J_à_faire_ajd_txt:{
    fontSize: 30,
  },
  view_princ_pour_add_j_fait:{
    alignSelf: 'stretch',
    width: '100%',
  },
  style_bouton_dropdown_matiere: {
    width: scale(150),
    height: verticalScale(30),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  style_du_text_du_dropdown:{
    textAlign: 'center',
    fontSize: 12,
  },
  view_du_selectionnez_matiere: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',    
    paddingVertical: '4%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#AFAFAF',
    height: verticalScale(60)
  },
  view_qui_enveloppe_textinput:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '5%',    
    paddingVertical: '4%',
    borderBottomWidth: 0.5,
    borderColor: '#AFAFAF',
    height: verticalScale(60)
  },

  view_du_date_du_J:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '4%',
    borderColor: '#AFAFAF',
    height: verticalScale(60)
  },

  choisir_date_J0_touchable:{
    borderWidth : 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 7,
  },

  taille_des_text:{
    fontSize: 16,
  },

  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
