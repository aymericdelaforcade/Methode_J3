import { StyleSheet, Text, View, FlatList, Alert, TextInput, Pressable} from 'react-native';
import { useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Button } from 'react-native-paper';
import React from 'react';
import  { showMessage } from 'react-native-flash-message';
import MockDate from 'mockdate';
import { useFocusEffect } from '@react-navigation/native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


import moment from 'moment';
import { startOfWeek, format, parse, subWeeks, addWeeks} from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import { StockageSlice } from '../redux/reducers/reducStockageJ';
import { journeeajdSlice } from '../redux/reducers/reducMajournéeajd';
import { informationaAfficherSlice } from '../redux/reducers/reducpourInforaAfficher';
import { CouleuraAfficherSlice } from '../redux/reducers/reducCouleuraAfficher';
import { counterSlice } from '../redux/reducers/reducmatiere2';

import DateTimePicker from '@react-native-community/datetimepicker';
import { ClipPath } from 'react-native-svg';




/*const simulatedDate = new Date(2022, 6, 5);
MockDate.set(simulatedDate);*/

/* Faire décalage des J possible par action
   Faire en sorte que le J décalé et fait s'affiche le jour où il est fait
   Faire en sorte, dans la boite de dialogue, que lorsque le J est déjà marqué comme non fait, changer le label
   Faire le décalage dès le change de stockage_des_J
*/

//IMPOSSIBLE D ENLEVER UN J QUI EST MARQUER COMME JAMAIS FAIT
//PEUT ETRE ENLEVER LE FAIT QU IL Y A DES PROBLEMES DE DUPLICATION A CHAUSE DES 2 USE EFFECT QUI ONT STOCKAGE DES J COMME DEPENDANCES

MockDate.reset();

export default function Calendrier({navigation}) {  

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)
  const CouleurSwitchOff= useSelector((state) => state.Test.CouleurSwitchOff)


  const [jour_1, setjour_1] = useState('jour 1') 
  const [jour_2, setjour_2] = useState('jour 2') 
  const [jour_3, setjour_3] = useState('jour 2') 
  const [jour_4, setjour_4] = useState('jour 2') 
  const [jour_5, setjour_5] = useState('jour 2') 
  const [jour_6, setjour_6] = useState('jour 2') 
  const [jour_7, setjour_7] = useState('jour 2') 
  
  const [box_1_id_a_afficher, setbox_1_id_a_afficher] = useState([]) 
  const [box_2_id_a_afficher, setbox_2_id_a_afficher] = useState([])
  const [box_3_id_a_afficher, setbox_3_id_a_afficher] = useState([]) 
  const [box_4_id_a_afficher, setbox_4_id_a_afficher] = useState([]) 
  const [box_5_id_a_afficher, setbox_5_id_a_afficher] = useState([]) 
  const [box_6_id_a_afficher, setbox_6_id_a_afficher] = useState([]) 
  const [box_7_id_a_afficher, setbox_7_id_a_afficher] = useState([]) 


  const [jour_à_afficher0, setjour_à_afficher0] = useState([]) 
  const [numéro_jour_à_afficher0, setnuméro_jour_à_afficher0] = useState([]) 
  const [mois_à_afficher0, setmois_à_afficher0] = useState([]) 

  const [jour_à_afficher, setjour_à_afficher] = useState([]) 
  const [numéro_jour_à_afficher, setnuméro_jour_à_afficher] = useState([]) 
  const [mois_à_afficher, setmois_à_afficher] = useState([]) 

  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [HeureChoisiedebut, setHeureChoisiedebut] = useState('00:00');
  const [HeureChoisieFin, setHeureChoisieFin] = useState('00:00');
  const [aujourdhuiselected, setaujourdhuiselected] = useState(true);
  const [TroisChoixpourJ, setTroisChoixpourJ] = useState(1);

  const [modifierJTrue, setmodifierJTrue] = useState(1)

  const [valeurpourJreportés, setvaleurpourJreportés] = useState('') // permet d'avoir différente valeurs reportées avec le même id dans le render item

  const [BoiteDialogdesJ, setBoiteDialogdesJ] = useState(false) // toutes les infos qui vont être utile lorsque l'on clique sur un J
  const [ BoitededialogueinformationsduJnuméro , setBoitededialogueinformationsduJnuméro] = useState('')
  const [ BoitededialogueinformationsduJnumber , setBoitededialogueinformationsduJnumber] = useState('')
  const[BoitededialogueinformationsduJMatière , setBoitededialogueinformationsduJMatière] = useState('')
  const [BoitededialogueinformationsduJNuméro_fiche, setBoitededialogueinformationsduJNuméro_fiche] = useState('')
  const [value, setValue] = React.useState(''); // truc des radios button du simple dialog qui s'ouvre quand on clique sur J
  const [BoitededialogueinformationsduJDonnéePourTraitementduJ ,setBoitededialogueinformationsduJDonnéePourTraitementduJ] = useState([])
  const [JdécaléouPas, setJdécaléouPas] = useState('') //permet de savoir avec certitude si c'est un J décalé, pour le traitement des J
  const [boitededialogueNomFiche, setBoitededialogueNomFiche] = useState('')
  const [NomFicheaChangéoupas, setNomFicheaChangéoupas] = useState(false)

  const [ParamètresVisible ,setParamètresVisible] = useState(false)
  const [DisplayNomFiche ,setDisplayNomFiche] = useState(true)
  const [DisplayCouleurfiche , setDisplayCouleurfiche] = useState(true)

  const [numeroNouveauJ, setnumeroNouveauJ ] = useState('')
  const [dateNouveauJ, seetdateNouveauJ ] = useState('01-01-2024')
  const [isDatePickerVisible, setisDatePickerVisible ] = useState(false)


  const moisEnFrancais = [ "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "sept.", "octobre", "nov.", "déc.", ];
  const joursSemaineListe = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];


  const dispatch = useDispatch();  
  const stockage_des_J = useSelector((state) => state.stockage_des_J.stockage_des_J)
  const informationaAfficher = useSelector((state) => state.informationaAfficher.informationaAfficher)
  const liste = useSelector((state) => state.liste.liste)
  const dernierJour = useSelector((state) => state.dernierJour.dernierJour)
  const CouleuraAfficher = useSelector((state) => state.CouleuraAfficher.CouleuraAfficher)
  const ListeMatieres = useSelector((state) => state.matiere.matiere)

  useEffect(() => {

    var numéro_jour_à_afficher_var = []
    var jour_à_afficher_var = []
    var mois_à_afficher_var = []

    const firstDayOfWeek2 = format(startOfWeek(new Date()), 'dd-MM-yyyy');
    const firstDayOfWeek3 = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY')
    setjour_1(firstDayOfWeek3);

    const mardi = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(2, 'day').format('DD-MM-YYYY')
    setjour_2(mardi)

    const mercredi = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(3, 'day').format('DD-MM-YYYY')
    setjour_3(mercredi)

    const jeudi = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(4, 'day').format('DD-MM-YYYY')
    setjour_4(jeudi)

    const vendredi = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(5, 'day').format('DD-MM-YYYY')
    setjour_5(vendredi)

    const samedi = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(6, 'day').format('DD-MM-YYYY')
    setjour_6(samedi)

    const dimanche = moment(firstDayOfWeek2, 'DD-MM-YYYY').add(7, 'day').format('DD-MM-YYYY')
    setjour_7(dimanche)


    const firstDayOfWeek = parse(firstDayOfWeek3, 'dd-MM-yyyy', new Date());
    const jour_semaine_nuémro = firstDayOfWeek.getDate() // permet d'afficher le numéro du jour de la semaine
    setnuméro_jour_à_afficher0(jour_semaine_nuémro)
    const numéro_jour_nom_semaine = firstDayOfWeek.getDay() //permet d'afficher le nom du jour de la semaine
    setjour_à_afficher0(joursSemaineListe[numéro_jour_nom_semaine])
    const mois_en_anglais = firstDayOfWeek.getMonth() //permet d'afficher le nom du mois
    setmois_à_afficher0(moisEnFrancais[mois_en_anglais])

    for (let i = 1; i < 7; i++) {    
      
      const demain = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(i, 'day').format('DD-MM-YYYY')

      const demain_convertible = parse(demain, 'dd-MM-yyyy', new Date());
      const jour_semaine_nuémro2 = demain_convertible.getDate() // permet d'afficher le numéro du jour de la semaine
      numéro_jour_à_afficher_var.push(jour_semaine_nuémro2)
      

      const numéro_jour_nom_semaine2 = demain_convertible.getDay() //permet d'afficher le nom du jour de la semaine
      jour_à_afficher_var.push(joursSemaineListe[numéro_jour_nom_semaine2])
      

      const mois_en_anglais2 = demain_convertible.getMonth() //permet d'afficher le nom du mois
      mois_à_afficher_var.push(moisEnFrancais[mois_en_anglais2])
    
    }

    setnuméro_jour_à_afficher(numéro_jour_à_afficher_var)
    setjour_à_afficher(jour_à_afficher_var)
    setmois_à_afficher(mois_à_afficher_var)

  }, []);

  useFocusEffect(() => {
    const ajd =  moment(new Date()).format("DD-MM-YYYY")
        for (var id in stockage_des_J) {
          if (stockage_des_J.hasOwnProperty(id)) {
            var dates = stockage_des_J[id].jour_séléctionné;
            if (dates && dates.length > 0){ //permet de ne pas crash si J supprimé
              if (dates.some(date => moment(date, "DD-MM-YYYY").isBefore(moment(ajd, "DD-MM-YYYY")))){ //code qui permet de reporter les J
                const date_concernées = dates.filter(date => moment(date, "DD-MM-YYYY").isBefore(moment(ajd, "DD-MM-YYYY")))
                  for (const dateàfiltrer of date_concernées){
                    if ((stockage_des_J[id].J_fait.some(element => element.numberduJ == (date_concernées.indexOf(dateàfiltrer)))) || stockage_des_J[id].pas_faire.some(element => element.numberduJ == (date_concernées.indexOf(dateàfiltrer))) || dateàfiltrer == stockage_des_J[id].jour_séléctionné[0] ){  

                    }else{
                      const number_du_J = stockage_des_J[id].jour_séléctionné.indexOf(dateàfiltrer) //va renvoyer le number du J (genre 1,2,3, pas l, 3, 7)
                      const numéro_du_J_récupération = stockage_des_J[id].liste_choisie //permet d'enter dans la liste du J choisi 
                      const numéro_du_J = numéro_du_J_récupération[number_du_J] // permet d'afficher le NUMERO du J affiché
                      const calculs_nombre_jour_retard = moment(dateàfiltrer, "DD-MM-YYYY").diff(moment(ajd, "DD-MM-YYYY"), 'days')
                      const nombre_jour_retard_positif = Math.abs(calculs_nombre_jour_retard)
                      if (stockage_des_J[id].date_reportée_fait.some(obj => obj.numberduJ === number_du_J) || stockage_des_J[id].date_reportée_pas_faire.some(obj => obj.numberduJ === number_du_J)){ //on vérifie qu'il n'est pas dans la case des J reportées fait

                      }else{
                        dispatch(StockageSlice.actions.ajouter_liste_date_reportée([id, nombre_jour_retard_positif, numéro_du_J, number_du_J]));
                      }
                    }
                  }
              }
            }
          }
        }
  });


  useEffect(() => {  // appellé à chaque fois que les dates sont mises à jour

    const box_1_interne = []
    const box_2_interne = []
    const box_3_interne = []
    const box_4_interne = []
    const box_5_interne = []
    const box_6_interne = []
    const box_7_interne = []


    for (var id in stockage_des_J) {
      if (stockage_des_J.hasOwnProperty(id)) {
        var dates = stockage_des_J[id].jour_séléctionné;
        var dates_decalees = stockage_des_J[id].date_reportée
        var dates_decalees_fait = stockage_des_J[id].date_reportée_fait
        var dates_decalees_pas_fait = stockage_des_J[id].date_reportée_pas_faire
        if (jour_1 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_1_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }
        if (jour_2 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_2_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }

        if (jour_3 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_3_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }

        if (jour_4 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_4_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }

        if (jour_5 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_5_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }

        if (jour_6 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_6_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }
        if (jour_7 == moment(new Date()).format("DD-MM-YYYY")){
          for (const Jdecales of dates_decalees) {
            box_7_interne.push({id2: id, decalage: Jdecales.decalage, numeroJ: Jdecales.numeroJ})
          }
        }

        

        for (const Jdecalesfait of dates_decalees_fait){
          if (Jdecalesfait.jour === jour_1){
            box_1_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }          
          if (Jdecalesfait.jour === jour_2){
            box_2_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }
          if (Jdecalesfait.jour === jour_3){
            box_3_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }
          if (Jdecalesfait.jour === jour_4){
            box_4_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }
          if (Jdecalesfait.jour === jour_5){
            box_5_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }
          if (Jdecalesfait.jour === jour_6){
            box_6_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }
          if (Jdecalesfait.jour === jour_7){
            box_7_interne.push({id2 : id, decalage: Jdecalesfait.decalage, numeroJ: Jdecalesfait.numeroJ})
          }
        }


        for (const Jdecalespasfait of dates_decalees_pas_fait){
          if (Jdecalespasfait.jour === jour_1){
            box_1_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }          
          if (Jdecalespasfait.jour === jour_2){
            box_2_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }
          if (Jdecalespasfait.jour === jour_3){
            box_3_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }
          if (Jdecalespasfait.jour === jour_4){
            box_4_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }
          if (Jdecalespasfait.jour === jour_5){
            box_5_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }
          if (Jdecalespasfait.jour === jour_6){
            box_6_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }
          if (Jdecalespasfait.jour === jour_7){
            box_7_interne.push({id2 : id, decalage: Jdecalespasfait.decalage, numeroJ: Jdecalespasfait.numeroJ})
          }
        }


        if (dates.includes(jour_1)) {
          box_1_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }

        if (dates.includes(jour_2)) {
            box_2_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }

        if (dates.includes(jour_3)) {
          box_3_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }
    
        if (dates.includes(jour_4)) {
          box_4_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }
    
        if (dates.includes(jour_5)) {
          box_5_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }
    
        if (dates.includes(jour_6)) {
          box_6_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }
    
        if (dates.includes(jour_7)) {
          box_7_interne.push({id2 : id, decalage: '', numeroJ: ''});
        }
        
      }
    }


    setbox_1_id_a_afficher(box_1_interne);
    setbox_2_id_a_afficher(box_2_interne);
    setbox_3_id_a_afficher(box_3_interne);
    setbox_4_id_a_afficher(box_4_interne);
    setbox_5_id_a_afficher(box_5_interne);
    setbox_6_id_a_afficher(box_6_interne);
    setbox_7_id_a_afficher(box_7_interne);

  }, [jour_1, stockage_des_J]);


  /*useEffect(() => {  // appellé à chaque fois que stokage_des_J va changer dans le store 

    for (var id in stockage_des_J) {
      if (stockage_des_J.hasOwnProperty(id)) {
        var dates = stockage_des_J[id].jour_séléctionné;
        if (dates.includes(jour_1)) {
          if ((box_1_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_1_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
        if (dates.includes(jour_2)) {
          if ((box_2_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_2_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
        if (dates.includes(jour_3)) {
          if ((box_3_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_3_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
        if (dates.includes(jour_4)) {
          if ((box_4_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_4_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
        if (dates.includes(jour_5)) {
          if ((box_5_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_5_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
        if (dates.includes(jour_6)) {
          if ((box_6_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_6_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
        if (dates.includes(jour_7)) {
          if ((box_7_id_a_afficher.some(element => element.id2 == id)) == false){
            setbox_7_id_a_afficher(oldArray => [...oldArray, {id2 : id, decalage: '', numeroJ: ''}] );
          }
        }
      }
    }
  }, [stockage_des_J]);*/

  function diminuer_jour () {
    var numéro_jour_à_afficher_var = []
    var jour_à_afficher_var = []
    var mois_à_afficher_var = []

    const firstDayOfWeek0 = parse(jour_1, 'dd-MM-yyyy', new Date())
    const firstDayOfWeek3 = moment(subWeeks(firstDayOfWeek0, 1)).format('DD-MM-YYYY')
    setjour_1(firstDayOfWeek3);

    const mardi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY')
    setjour_2(mardi)

    const mercredi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(2, 'day').format('DD-MM-YYYY')
    setjour_3(mercredi)

    const jeudi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(3, 'day').format('DD-MM-YYYY')
    setjour_4(jeudi)

    const vendredi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(4, 'day').format('DD-MM-YYYY')
    setjour_5(vendredi)

    const samedi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(5, 'day').format('DD-MM-YYYY')
    setjour_6(samedi)

    const dimanche = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(6, 'day').format('DD-MM-YYYY')
    setjour_7(dimanche)


    const firstDayOfWeek = parse(firstDayOfWeek3, 'dd-MM-yyyy', new Date());
    const jour_semaine_nuémro = firstDayOfWeek.getDate() // permet d'afficher le numéro du jour de la semaine
    setnuméro_jour_à_afficher0(jour_semaine_nuémro)
    const numéro_jour_nom_semaine = firstDayOfWeek.getDay() //permet d'afficher le nom du jour de la semaine
    setjour_à_afficher0(joursSemaineListe[numéro_jour_nom_semaine])
    const mois_en_anglais = firstDayOfWeek.getMonth() //permet d'afficher le nom du mois
    setmois_à_afficher0(moisEnFrancais[mois_en_anglais])

    for (let i = 1; i < 7; i++) {    
      
    const demain = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(i, 'day').format('DD-MM-YYYY')

    const demain_convertible = parse(demain, 'dd-MM-yyyy', new Date());
    const jour_semaine_nuémro2 = demain_convertible.getDate() // permet d'afficher le numéro du jour de la semaine
    numéro_jour_à_afficher_var.push(jour_semaine_nuémro2)
    

    const numéro_jour_nom_semaine2 = demain_convertible.getDay() //permet d'afficher le nom du jour de la semaine
    jour_à_afficher_var.push(joursSemaineListe[numéro_jour_nom_semaine2])
    

    const mois_en_anglais2 = demain_convertible.getMonth() //permet d'afficher le nom du mois
    mois_à_afficher_var.push(moisEnFrancais[mois_en_anglais2])
    
    }

    setnuméro_jour_à_afficher(numéro_jour_à_afficher_var)
    setjour_à_afficher(jour_à_afficher_var)
    setmois_à_afficher(mois_à_afficher_var)
  }

  function augmenter_jour () {

    var numéro_jour_à_afficher_var = []
    var jour_à_afficher_var = []
    var mois_à_afficher_var = []

    const firstDayOfWeek0 = parse(jour_1, 'dd-MM-yyyy', new Date())
    const firstDayOfWeek3 = moment(addWeeks(firstDayOfWeek0, 1)).format('DD-MM-YYYY')
    setjour_1(firstDayOfWeek3);

    const mardi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY')
    setjour_2(mardi)

    const mercredi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(2, 'day').format('DD-MM-YYYY')
    setjour_3(mercredi)

    const jeudi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(3, 'day').format('DD-MM-YYYY')
    setjour_4(jeudi)

    const vendredi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(4, 'day').format('DD-MM-YYYY')
    setjour_5(vendredi)

    const samedi = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(5, 'day').format('DD-MM-YYYY')
    setjour_6(samedi)

    const dimanche = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(6, 'day').format('DD-MM-YYYY')
    setjour_7(dimanche)


    const firstDayOfWeek = parse(firstDayOfWeek3, 'dd-MM-yyyy', new Date());
    const jour_semaine_nuémro = firstDayOfWeek.getDate() // permet d'afficher le numéro du jour de la semaine
    setnuméro_jour_à_afficher0(jour_semaine_nuémro)
    const numéro_jour_nom_semaine = firstDayOfWeek.getDay() //permet d'afficher le nom du jour de la semaine
    setjour_à_afficher0(joursSemaineListe[numéro_jour_nom_semaine])
    const mois_en_anglais = firstDayOfWeek.getMonth() //permet d'afficher le nom du mois
    setmois_à_afficher0(moisEnFrancais[mois_en_anglais])

    for (let i = 1; i < 7; i++) {    
      
    const demain = moment(firstDayOfWeek3, 'DD-MM-YYYY').add(i, 'day').format('DD-MM-YYYY')

    const demain_convertible = parse(demain, 'dd-MM-yyyy', new Date());
    const jour_semaine_nuémro2 = demain_convertible.getDate() // permet d'afficher le numéro du jour de la semaine
    numéro_jour_à_afficher_var.push(jour_semaine_nuémro2)
    

    const numéro_jour_nom_semaine2 = demain_convertible.getDay() //permet d'afficher le nom du jour de la semaine
    jour_à_afficher_var.push(joursSemaineListe[numéro_jour_nom_semaine2])
    

    const mois_en_anglais2 = demain_convertible.getMonth() //permet d'afficher le nom du mois
    mois_à_afficher_var.push(moisEnFrancais[mois_en_anglais2])
    
    }

    setnuméro_jour_à_afficher(numéro_jour_à_afficher_var)
    setjour_à_afficher(jour_à_afficher_var)
    setmois_à_afficher(mois_à_afficher_var)
  }


  function traitement_du_J_fait (item, number_du_J, numeroJ, JdécaléouPas) {

    if (JdécaléouPas !== ''){
      if (stockage_des_J[item].date_reportée_fait.some(element => element.numeroJ == numeroJ)) {
        dispatch(StockageSlice.actions.retirer_dans_liste_fait([item, number_du_J, numeroJ, JdécaléouPas]));
        showMessage({ message: "J marqué comme non fait", backgroundColor: '#EC9D00', style:{alignItems: 'center', justifyContent: 'center'}})
      }

      if (!stockage_des_J[item].date_reportée_fait.some(element => element.numeroJ == numeroJ)) { // si ça l'inclut pas = le J n'a pas été fait = faut le rajouter dans la liste
        dispatch(StockageSlice.actions.ajouter_dans_liste_fait([item, number_du_J, numeroJ, JdécaléouPas]));
        showMessage({ message: "J marqué comme fait !", backgroundColor: '#1AAD00', style:{alignItems: 'center', justifyContent: 'center'}})
      }
    }else{
      if (stockage_des_J[item].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == numeroJ)) {
        dispatch(StockageSlice.actions.retirer_dans_liste_fait([item, number_du_J, numeroJ, JdécaléouPas]));
        showMessage({ message: "J marqué comme non fait", backgroundColor: '#EC9D00', style:{alignItems: 'center', justifyContent: 'center'}})
      }

      if (!stockage_des_J[item].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == numeroJ)) { // si ça l'inclut pas = le J n'a pas été fait = faut le rajouter dans la liste
        dispatch(StockageSlice.actions.ajouter_dans_liste_fait([item, number_du_J, numeroJ, JdécaléouPas]));
        showMessage({ message: "J marqué comme fait !", backgroundColor: '#1AAD00', style:{alignItems: 'center', justifyContent: 'center'}})
      }
    }
  }

  function ne_pas_faire_le_J (item, number_du_J, numeroJ, JdécaléouPas) {
    if (JdécaléouPas !== ''){
      if (stockage_des_J[item].date_reportée_pas_faire.some(element => element.numeroJ == numeroJ)) {
        dispatch(StockageSlice.actions.retirer_dans_liste_pas_faire([item, number_du_J, numeroJ, JdécaléouPas]));
      }

      if (!stockage_des_J[item].date_reportée_pas_faire.some(element => element.numeroJ == numeroJ)) { // si ça l'inclut pas = le J n'a pas été fait = faut le rajouter dans la liste
        dispatch(StockageSlice.actions.ajouter_dans_liste_pas_faire([item, number_du_J, numeroJ, JdécaléouPas]));
        showMessage({ message: "Le J ne sera jamais fait", backgroundColor: '#FF0000', style:{alignItems: 'center', justifyContent: 'center'}})
      }
    }else{
      if (stockage_des_J[item].pas_faire.some(element => element.numberduJ == number_du_J && element.numeroJ == numeroJ)) {
        dispatch(StockageSlice.actions.retirer_dans_liste_pas_faire([item, number_du_J, numeroJ, JdécaléouPas]));
      }
      if (!stockage_des_J[item].pas_faire.some(element => element.numberduJ == number_du_J && element.numeroJ == numeroJ)) { // si ça l'inclut pas = le J n'a pas été fait = faut le rajouter dans la liste
        dispatch(StockageSlice.actions.ajouter_dans_liste_pas_faire([item, number_du_J, numeroJ, JdécaléouPas]));
        showMessage({ message: "Le J ne sera jamais fait", backgroundColor: '#FF0000', style:{alignItems: 'center', justifyContent: 'center'}})
      }
    }
  }

  function gérerlaSortiedelaBoitedeDialogue () {

    if (value == 'fait') {
      const item = BoitededialogueinformationsduJDonnéePourTraitementduJ[0]
      const number_du_J = BoitededialogueinformationsduJDonnéePourTraitementduJ[1]
      const numeroJ = BoitededialogueinformationsduJDonnéePourTraitementduJ[2]
      traitement_du_J_fait(item, number_du_J, numeroJ, JdécaléouPas)
    }

    if (value == 'pas faire') {
      const item = BoitededialogueinformationsduJDonnéePourTraitementduJ[0]
      const number_du_J = BoitededialogueinformationsduJDonnéePourTraitementduJ[1]
      const numeroJ = BoitededialogueinformationsduJDonnéePourTraitementduJ[2]
      ne_pas_faire_le_J(item, number_du_J, numeroJ, JdécaléouPas)
    }

    
    if (value == 'supprimer') {
      Alert.alert(
        'Supprimer le J',
        'Attention cela va supprimer le J0 et tout les autres J, continuer ?',
        [
          {
            text: 'Annuler',
          },
          {
            text: 'Supprimer',
            onPress: () => continuer(),
          },
        ],
        { cancelable: true }
      );
    function continuer (){
      const item = BoitededialogueinformationsduJDonnéePourTraitementduJ[0]
      dispatch(StockageSlice.actions.supprimer_le_J(item));
    }
    }
    
  }

  const handleTimeChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'set') {
      const time = selectedDate
      const timecorrect = moment(time).format('HH:mm')
      const timepreshot = moment(time).add(1, 'hour').format('HH:mm')
      setHeureChoisiedebut(timecorrect);
      setHeureChoisieFin(timepreshot)
    }
    };


  const handleTimeChange2 = (event, selectedDate) => {
    setShowPicker2(false);
    if (event.type === 'set') {
      const time = selectedDate
      const timecorrect = moment(time).format('HH:mm')
      setHeureChoisieFin(timecorrect);
    }
  };

  const pinchGesture = Gesture.Pinch()
  .onEnd(() => {
    navigation.navigate('4J')
  });

  const handleConfirm = (date) => {
    const datebienfait = moment(date).format("DD-MM-YYYY");
    seetdateNouveauJ(datebienfait);

    const datedeBase = stockage_des_J[BoitededialogueinformationsduJDonnéePourTraitementduJ[0]].jour_séléctionné[BoitededialogueinformationsduJnumber]

    if (datedeBase <= datebienfait){
      const datecréeformat = moment(datebienfait, 'DD-MM-YYYY')
      const datedeBaseformat = moment(datedeBase, 'DD-MM-YYYY')
      const nbjourdedifférence = datecréeformat.diff(datedeBaseformat, 'days')
      const nouveauJréel = nbjourdedifférence + BoitededialogueinformationsduJnuméro
      setnumeroNouveauJ(nouveauJréel.toString())
    }


    hideDatePicker();
  };

  const onDateChange = (date, type) => {
    //sert à rien mais à laisser (senser être appelé par ondatechange)
  };

  const hideDatePicker = () => {
    setisDatePickerVisible(false);
    setnumeroNouveauJ('')
  };

  function calculnouvelledate(texteSaisi){ //en gros vérifie que c'est un J supérieur, puis va chercher le jour de base pour additioner la différence entre le J choisi et l'ancien
    if (texteSaisi >= BoitededialogueinformationsduJnuméro){
      const datedeBase = stockage_des_J[BoitededialogueinformationsduJDonnéePourTraitementduJ[0]].jour_séléctionné[BoitededialogueinformationsduJnumber]
      const nombreJouràajouter = texteSaisi - BoitededialogueinformationsduJnuméro
      const dateNouveauJinterne = moment(datedeBase, 'DD-MM-YYYY').add(nombreJouràajouter, 'days').format('DD-MM-YYYY')
      console.log(dateNouveauJinterne)
      seetdateNouveauJ(dateNouveauJinterne)

    }
  }


  const renderItem = ({item}) => { //Ce que rend la flat list qui gère la liste des matière

    const number_du_J = stockage_des_J[item.id2].jour_séléctionné.indexOf(jour_1) //va renvoyer le number du J (genre 1,2,3, pas l, 3, 7)
    const numéro_du_J_récupération = stockage_des_J[item.id2].liste_choisie //permet d'enter dans la liste du J choisi 
    var numéro_du_J = numéro_du_J_récupération[number_du_J] // permet d'afficher le NUMERO du J affiché
    var couleur_du_J1 = '#AE07B6' //si c'est un J reporté ça prend cette couleur
    var opacité = 1
    var nombre_jour_retard_a_afficher= ''
    const matièreactuelle = stockage_des_J[item.id2].matière_séléctionnée

    if (stockage_des_J[item.id2].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == item.numeroJ)) {
      opacité = 0.3
    }

    if (!stockage_des_J[item.id2].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == item.numeroJ)) {
      opacité = 1
    }
    
    if (stockage_des_J[item.id2].pas_faire.some(element => element.numberduJ == number_du_J && element.numeroJ == item.numeroJ)){
      var couleur_du_J1 = '#FF0000'
    }
    else{
      if (item.decalage !== ''){ // on vérifie si le J qu'on affiche est un J reportée ou à faire
        numéro_du_J = item.numeroJ
        nombre_jour_retard_a_afficher = '+'+item.decalage

        if (stockage_des_J[item.id2].date_reportée_fait.some(element => element.numeroJ == item.numeroJ)) { 
          opacité = 0.3
        }

        if (stockage_des_J[item.id2].date_reportée_pas_faire.some(element => element.numeroJ == item.numeroJ)) { //fonctionne aussi pour les J reportés fait, considérés comme number du J = -1
          couleur_du_J1 = '#BF0051'
        }

      
      }else{
        if (CouleuraAfficher === true){ //affiche la couleur de la matière
          const matièreetcouleur = ListeMatieres.find(item => item[0] === matièreactuelle)
          if (matièreetcouleur !== undefined && matièreetcouleur !== null) {
            couleur_du_J1 = matièreetcouleur[1]
          }
        }else{
          if (number_du_J == 0){
            var couleur_du_J1 = '#D15600'
          }
          if (number_du_J == 1){
            var couleur_du_J1 = '#D18D00'
          }
          if (number_du_J == 2){
            var couleur_du_J1 = '#CBD100'
          }
          if (number_du_J == 3){
            var couleur_du_J1 = '#84D100'
          }
          if (number_du_J == 4){
            var couleur_du_J1 = '#1AD100'
          }
          if (number_du_J == 5){
            var couleur_du_J1 = '#00C747'
          }
          if (number_du_J == 6){
            var couleur_du_J1 = '#00C78D'
          }
          if (number_du_J == 7){
            var couleur_du_J1 = '#00B5C7'
          }
          if (number_du_J == 8){
            var couleur_du_J1 = '#006BC7'
          }
          if (number_du_J == 9){
            var couleur_du_J1 = '#001CC7'
          }
        }
      }
    }

    if (numéro_du_J == undefined && item.decalage == ''){ //gère le cas où c'est un J rajouté simple
      numéro_du_J = moment(jour_1, 'DD-MM-YYYY').diff(moment(stockage_des_J[item.id2].jour_séléctionné[0], 'DD-MM-YYYY'), 'days')
      if (CouleuraAfficher === true){ //affiche la couleur de la matière
        const matièreetcouleur = ListeMatieres.find(item => item[0] === matièreactuelle)
        if (matièreetcouleur !== undefined && matièreetcouleur !== null) {
          couleur_du_J1 = matièreetcouleur[1]
        }
      }else{
        couleur_du_J1 = '#001D79'
      }
    }

    if (numéro_du_J == undefined && item.decalage !== ''){ //gère le cas où le J rajouté est décalé
      numéro_du_J = moment(jour_1, 'DD-MM-YYYY').diff(moment(stockage_des_J[item.id2].jour_séléctionné[0], 'DD-MM-YYYY'), 'days')
      if (CouleuraAfficher === true){ //affiche la couleur de la matière
        const matièreetcouleur = ListeMatieres.find(item => item[0] === matièreactuelle)
        if (matièreetcouleur !== undefined && matièreetcouleur !== null) {
          couleur_du_J1 = matièreetcouleur[1]
        }
      }else{
        couleur_du_J1 = '#AE07B6'
      }
    }


    return(
      <TouchableOpacity style={[
        styles.style_flat_list_box , {/*backgroundColor: couleur_du_J1opacity: opacité*/}]} 
        delayLongPress={200}  
        onLongPress={() => {traitement_du_J_fait(item.id2, number_du_J, item.numeroJ, item.decalage)}} //PROBLEME ICI
        onPress={() => {
          setBoiteDialogdesJ(true), 
          setBoitededialogueinformationsduJnuméro(numéro_du_J), 
          setBoitededialogueinformationsduJnumber(number_du_J),
          setJdécaléouPas(item.decalage),
          setBoitededialogueinformationsduJMatière(stockage_des_J[item.id2].matière_séléctionnée),
          setBoitededialogueinformationsduJNuméro_fiche(stockage_des_J[item.id2].numéro_du_J),
          setBoitededialogueNomFiche(stockage_des_J[item.id2].nomFicheChoisit),
          setBoitededialogueinformationsduJDonnéePourTraitementduJ([item.id2, number_du_J, item.numeroJ])}}>

        <View style={[styles.style_des_view_des_3_éléments_rendus_1, {backgroundColor: couleur_du_J1, opacity: opacité}]}>
          <Text style={{fontSize: 15, color: 'black'}} numberOfLines={2} adjustsFontSizeToFit={true}>J{numéro_du_J}{nombre_jour_retard_a_afficher}</Text> 
        </View>
        <View style={[styles.style_des_view_des_3_éléments_rendus_2, {backgroundColor: couleur_du_J1, opacity: opacité}]}>
        </View>
        <View style={[styles.style_des_view_des_3_éléments_rendus_3, {backgroundColor: couleur_du_J1, opacity: opacité}]}>
          <Text style={{fontSize: 14, color: 'black'}}>{stockage_des_J[item.id2].numéro_du_J}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  const renderItem2Wrapp = (jour_qui_arrive) => {
    return ({ item, index }) => {
      return renderItem2({ item }, jour_qui_arrive);
    };
  };

  const renderItem2 = ({item}, jour_qui_arrive) => { //Ce que rend la flat list qui gère le rendu des J de la box 2, première ligne permet de retourner le numéro du J, la deuxième la matière

    const number_du_J = stockage_des_J[item.id2].jour_séléctionné.indexOf(jour_qui_arrive) //va renvoyer le number du J (genre 1,2,3, pas l, 3, 7)
    const numéro_du_J_récupération = stockage_des_J[item.id2].liste_choisie //permet d'enter dans la liste du J choisi 
    var numéro_du_J = numéro_du_J_récupération[number_du_J] // permet d'afficher le NUMERO du J affiché
    var couleur_du_J2 = '#AE07B6'
    var opacité = 1
    var nombre_jour_retard_a_afficher= ''
    const matièreactuelle = stockage_des_J[item.id2].matière_séléctionnée

    if (stockage_des_J[item.id2].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == item.numeroJ)) {
      opacité = 0.3
    }

    if (!stockage_des_J[item.id2].J_fait.some(element => element.numberduJ == number_du_J && element.numeroJ == item.numeroJ)) {
      opacité = 1
    }

    if (stockage_des_J[item.id2].pas_faire.some(element => element.numberduJ == number_du_J && element.numeroJ == item.numeroJ)){
      var couleur_du_J2 = '#FF0000'
    }
    else{
      if (item.decalage !== ''){ // on vérifie si le J qu'on affiche est un J reportée ou à faire
        numéro_du_J = item.numeroJ
        nombre_jour_retard_a_afficher = '+'+item.decalage

        
        if (stockage_des_J[item.id2].date_reportée_fait.some(element => element.numeroJ == item.numeroJ)) { 
          opacité = 0.3
        }

        if (stockage_des_J[item.id2].date_reportée_pas_faire.some(element => element.numeroJ == item.numeroJ)) { //fonctionne aussi pour les J reportés fait, considérés comme number du J = -1
          couleur_du_J2 = '#BF0051'
        }

        
      }else{
        if (CouleuraAfficher === true){ //affiche la couleur de la matière
          const matièreetcouleur = ListeMatieres.find(item => item[0] === matièreactuelle)
          if (matièreetcouleur !== undefined && matièreetcouleur !== null) {
            couleur_du_J2 = matièreetcouleur[1]
          }
        }else{
          if (number_du_J == 0){
            var couleur_du_J2 = '#D15600'
          }
          if (number_du_J == 1){
            var couleur_du_J2 = '#D18D00'
          }
          if (number_du_J == 2){
            var couleur_du_J2 = '#CBD100'
          }
          if (number_du_J == 3){
            var couleur_du_J2 = '#84D100'
          }
          if (number_du_J == 4){
            var couleur_du_J2 = '#1AD100'
          }
          if (number_du_J == 5){
            var couleur_du_J2 = '#00C747'
          }
          if (number_du_J == 6){
            var couleur_du_J2 = '#00C78D'
          }
          if (number_du_J == 7){
            var couleur_du_J2 = '#00B5C7'
          }
          if (number_du_J == 8){
            var couleur_du_J2 = '#006BC7'
          }
          if (number_du_J == 9){
            var couleur_du_J2 = '#001CC7'
          }
        }
      }
    }

    if (numéro_du_J == undefined && item.decalage == ''){ //gère le cas où c'est un J rajouté simple
      numéro_du_J = moment(jour_1, 'DD-MM-YYYY').diff(moment(stockage_des_J[item.id2].jour_séléctionné[0], 'DD-MM-YYYY'), 'days')
      if (CouleuraAfficher === true){ //affiche la couleur de la matière
        const matièreetcouleur = ListeMatieres.find(item => item[0] === matièreactuelle)
        if (matièreetcouleur !== undefined && matièreetcouleur !== null) {
          couleur_du_J2 = matièreetcouleur[1]
        }
      }else{
        couleur_du_J2 = '#001D79'
      }
    }

    if (numéro_du_J == undefined && item.decalage !== ''){ //gère le cas où le J rajouté est décalé
      numéro_du_J = moment(jour_1, 'DD-MM-YYYY').diff(moment(stockage_des_J[item.id2].jour_séléctionné[0], 'DD-MM-YYYY'), 'days')
      if (CouleuraAfficher === true){ //affiche la couleur de la matière
        const matièreetcouleur = ListeMatieres.find(item => item[0] === matièreactuelle)
        if (matièreetcouleur !== undefined && matièreetcouleur !== null) {
          couleur_du_J2 = matièreetcouleur[1]
        }
      }else{
        couleur_du_J2 = '#AE07B6'
      }
    }


    return(
      <TouchableOpacity 
      style={[styles.style_flat_list_box]} 
      delayLongPress={200} 
      onLongPress={() => {traitement_du_J_fait(item.id2, number_du_J, item.numeroJ, item.decalage)}}
      onPress={() => {
          setBoiteDialogdesJ(true), 
          setJdécaléouPas(item.decalage),
          setBoitededialogueinformationsduJnuméro(numéro_du_J), 
          setBoitededialogueinformationsduJnumber(number_du_J)
          setBoitededialogueinformationsduJMatière(stockage_des_J[item.id2].matière_séléctionnée),
          setBoitededialogueinformationsduJNuméro_fiche(stockage_des_J[item.id2].numéro_du_J),
          setBoitededialogueNomFiche(stockage_des_J[item.id2].nomFicheChoisit),
          setBoitededialogueinformationsduJDonnéePourTraitementduJ([item.id2, number_du_J, item.numeroJ])}}>

        <View style={[styles.style_des_view_des_3_éléments_rendus_1 , {backgroundColor: couleur_du_J2, opacity: opacité}]}>
          <Text style={{fontSize: 15, color: 'black'}} numberOfLines={2} adjustsFontSizeToFit={true}>J{numéro_du_J}{nombre_jour_retard_a_afficher}</Text> 
        </View>
        <View style={[styles.style_des_view_des_3_éléments_rendus_2 , {backgroundColor: couleur_du_J2, opacity: opacité}]}>
        </View>
        <View style={[styles.style_des_view_des_3_éléments_rendus_3 , {backgroundColor: couleur_du_J2, opacity: opacité}]}>
          <Text style={{fontSize: 14, color: 'black'}}>{stockage_des_J[item.id2].numéro_du_J}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <GestureDetector gesture={pinchGesture} >
        <View style={[styles.principal, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
          <View style={[styles.haut_total,{backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
            <View style={[styles.haut_icone_passer, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
              <TouchableOpacity style={[styles.icon_jour_1, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]} onPress={diminuer_jour}>
                  <Icon name="chevron-left" style={{fontSize: scale(35)}} color={TextColor}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.icon_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]} onPress={augmenter_jour}>
                  <Icon name="chevron-right" style={{fontSize: scale(35)}} color={TextColor}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.haut, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>               
              <View style={styles.jour_2_1}>              
                <View style={[styles.text_jour_1, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={styles.text_jours}>{jour_à_afficher0}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher0}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher0}</Text>
                </View>
              </View>
              <View style={styles.jour_2}>
                <View style={[styles.text_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={styles.text_jours}>{jour_à_afficher[0]}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher[0]}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher[0]}</Text>
                </View>
              </View>
              <View style={styles.jour_2}>
                <View style={[styles.text_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={styles.text_jours}>{jour_à_afficher[1]}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher[1]}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher[1]}</Text>
                </View>
              </View>
              <View style={styles.jour_2}>
                <View style={[styles.text_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={styles.text_jours}>{jour_à_afficher[2]}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher[2]}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher[2]}</Text>
                </View>
              </View>

              <View style={styles.jour_2}>
                <View style={[styles.text_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={styles.text_jours}>{jour_à_afficher[3]}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher[3]}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher[3]}</Text>
                </View>
              </View>
              <View style={styles.jour_2}>
                <View style={[styles.text_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={styles.text_jours}>{jour_à_afficher[4]}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher[4]}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher[4]}</Text>
                </View>
              </View>
      
              <View style={styles.jour_2}>
                <View style={[styles.text_jour_2, {backgroundColor :  DarkMode ? CouleurBouton : '#D6D6D6'}]}>
                  <Text style={{fontSize: 11}}>{jour_à_afficher[5]}</Text>
                  <Text style={styles.text_jours}>{numéro_jour_à_afficher[5]}</Text>
                  <Text style={styles.text_jours}>{mois_à_afficher[5]}</Text>
                </View>
              </View>
            </View>
          </View>
          <ConfirmDialog
            dialogStyle = {{borderRadius : 10, backgroundColor: CouleurBouton}}
            contentStyle ={{padding:0, paddingTop: 0, backgroundColor: CouleurFond}}
            buttonsStyle = {{backgroundColor: CouleurBouton, borderBottomEndRadius: 10, borderBottomLeftRadius: 10}}
            animationType="fade"
            title= {'J'+ BoitededialogueinformationsduJnuméro + '  ' + BoitededialogueinformationsduJMatière + ' cours ' + BoitededialogueinformationsduJNuméro_fiche }
            titleStyle= {{textAlign: 'center', marginBottom: '3%', color: TextColor}}
            keyboardShouldPersistTaps="handled"
            visible={BoiteDialogdesJ}
            onTouchOutside={() => {setBoiteDialogdesJ(false);setBoitededialogueinformationsduJnuméro(), setValue('fait'),setTroisChoixpourJ(1),setJdécaléouPas(''), setNomFicheaChangéoupas(false), setnumeroNouveauJ(''), seetdateNouveauJ('01-01-2024')}}
            positiveButton={{
              style: {color: TextColor} ,
                title: "OK",
                onPress: () => {
                  if (modifierJTrue == 1){
                    setBoiteDialogdesJ(false);
                    gérerlaSortiedelaBoitedeDialogue()
                    setBoitededialogueinformationsduJnuméro()
                    if (NomFicheaChangéoupas === true){
                      dispatch(StockageSlice.actions.changerNomFiche([BoitededialogueinformationsduJDonnéePourTraitementduJ[0], boitededialogueNomFiche]))
                    }
                  }
                  if (modifierJTrue == 2){
                    dispatch(journeeajdSlice.actions.ajouter([
                            aujourdhuiselected,
                            HeureChoisiedebut, 
                            HeureChoisieFin, 
                            BoitededialogueinformationsduJnuméro,
                            BoitededialogueinformationsduJMatière,
                            BoitededialogueinformationsduJNuméro_fiche,
                            BoitededialogueinformationsduJnumber,
                            JdécaléouPas
                            ]))

                      setaujourdhuiselected(true); 
                      setHeureChoisieFin('00:00'); 
                      setHeureChoisiedebut('00:00')  
                      showMessage({ message: "J ajouté à l'agenda !", backgroundColor: '#1AAD00', style:{alignItems: 'center', justifyContent: 'center'}})                  
                  }
                  if (modifierJTrue == 3){
                    dispatch(StockageSlice.actions.RajouterJ([BoitededialogueinformationsduJDonnéePourTraitementduJ[0], dateNouveauJ]))
                  }
                  setBoiteDialogdesJ(false);setBoitededialogueinformationsduJnuméro(), setValue('fait'),setTroisChoixpourJ(1),
                  setJdécaléouPas('')
                  setBoitededialogueNomFiche('')
                  setNomFicheaChangéoupas(false)
                  setBoitededialogueinformationsduJDonnéePourTraitementduJ('')
                  seetdateNouveauJ('01-01-2024')
                }
            }}
            negativeButton={{
               style: {color: TextColor} ,
                title: "annuler",
                onPress: () => {
                  setBoiteDialogdesJ(false); 
                  setBoitededialogueinformationsduJnuméro()
                  setValue('fait')
                  setJdécaléouPas('')
                  setTroisChoixpourJ(1)
                  setBoitededialogueNomFiche('')
                  setNomFicheaChangéoupas(false)
                  setBoitededialogueinformationsduJDonnéePourTraitementduJ('')
                  seetdateNouveauJ('01-01-2024')
                }
            }}>
              <View style={{marginBottom: '2%', marginTop: '2%'}}>
                <View style={{flexDirection: 'row'}}>
                    <Pressable style={modifierJTrue==1 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] : [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff}]} onPress={() => setmodifierJTrue(1)} >
                      <Text style={{color: modifierJTrue == 1 ? 'black' : TextColor}}>Modifier le J</Text>
                    </Pressable>
                    <Pressable style={modifierJTrue==2 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] : [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff}]} onPress={() => setmodifierJTrue(2)} >
                      <Text style={{color: modifierJTrue == 2 ? 'black' : TextColor}} numberOfLines={2}>Ajouter à l'agenda</Text>
                    </Pressable>
                    <Pressable style={modifierJTrue==3 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] : [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff}]} onPress={() => setmodifierJTrue(3)} >
                      <Text style={{color: modifierJTrue == 3 ? 'black' : TextColor}} numberOfLines={2}>Rajouter un J</Text>
                    </Pressable>
                </View> 
                { modifierJTrue==1 ? (
                  <View style={{alignItems: 'center', height: verticalScale(165), flexDirection: 'column'}}>
                    <View style={{height: verticalScale(33), marginTop: '6%', marginBottom: '4%', flexDirection: 'row'}}>
                    <TextInput 
                      style={{ fontSize: 17, flex: 3, marginLeft: '8%' }}
                      placeholder= {boitededialogueNomFiche}
                      value={boitededialogueNomFiche || "Aucun nom ajouté"}
                      placeholderTextColor={TextColor}
                      color= {TextColor}
                      onChangeText={(texteSaisi) => {
                        setBoitededialogueNomFiche(texteSaisi);
                        setNomFicheaChangéoupas(true);
                        setTroisChoixpourJ(0)
                      }} 
                    />
                    <Text style={{color: 'grey', flex: 1.6, textAlign: 'center', marginTop: '1%', marginRight: '11%'}} numberOfLines={2}>Tapez pour modifier</Text>
                    </View>
                    <View style={{height: verticalScale(85)}}>
                      <Button style={TroisChoixpourJ==1 ? [styles.troisBouttonsduhautPRESSED, {backgroundColor: CouleurActive}] : [styles.troisBouttonsduhautNOPRESSED, {backgroundColor: CouleurSwitchOff}]} onPress={() => {setTroisChoixpourJ(1); setValue('fait')}} >
                        <Ionicons name="checkmark-sharp" size={18} style={{color: TroisChoixpourJ==1 ?'black' : TextColor}}/>
                        <Text>  </Text>
                        <Text style={{color: TroisChoixpourJ==1 ?'black' : TextColor}}>Marquer le J comme fait</Text>
                      </Button>
                      <Button style={TroisChoixpourJ==2 ? [styles.troisBouttonsduhautPRESSED, {backgroundColor: CouleurActive}] : [styles.troisBouttonsduhautNOPRESSED, {backgroundColor: CouleurSwitchOff}]} onPress={() => {setTroisChoixpourJ(2), setValue('pas faire')}} >
                        <Ionicons name="close" size={18} style={{color: TroisChoixpourJ==2 ?'black' : TextColor}}/>
                        <Text>  </Text>
                        <Text style={{color: TroisChoixpourJ==2 ?'black' : TextColor}}>Ne jamais faire ce J</Text>
                      </Button>
                      <Button style={TroisChoixpourJ==3 ? [styles.troisBouttonsduhautPRESSED, {backgroundColor: CouleurActive}] : [styles.troisBouttonsduhautNOPRESSED, {backgroundColor: CouleurSwitchOff}]} onPress={() => {setTroisChoixpourJ(3), setValue('supprimer')}} >
                        <Ionicons name="trash-outline" size={18} style={{color: TroisChoixpourJ==3 ?'black' : TextColor}}/>
                        <Text>  </Text>
                        <Text style={{color: TroisChoixpourJ==3 ?'black' : TextColor}}>Supprimer le J</Text>
                      </Button>
                    </View>
                </View>): modifierJTrue==2 ?(
                <View style={styles.viewajoutcalendar}>
                  <View style={{flexDirection: 'row', marginTop: '5%'}}>
                    <Button style={aujourdhuiselected ? [styles.choixjourcalendrierpressed, {backgroundColor: CouleurActive}] : [styles.choixjourcalendrierNOpressed, {backgroundColor: CouleurSwitchOff}]} onPress={() => setaujourdhuiselected(true)} >
                      <Text style={{color : aujourdhuiselected ? 'black' : TextColor, fontSize: 15 }}>aujourd'hui</Text>
                    </Button>
                    <Button style={aujourdhuiselected ? [styles.choixjourcalendrierNOpressed, {backgroundColor: CouleurSwitchOff}] : [styles.choixjourcalendrierpressed, {backgroundColor: CouleurActive}]}  onPress={() => {setaujourdhuiselected(false)}}>
                      <Text  style={{fontSize: 15, color: aujourdhuiselected ?  TextColor: 'black' }}>demain</Text>
                    </Button>
                  </View>
                  <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button style={{marginLeft: '8%', marginBottom: '2%', marginTop: '5%',fontSize: 16, backgroundColor: CouleurBouton}} onPress={() => setShowPicker(true)}><Text>Heure de début</Text></Button>
                   {showPicker && ( <DateTimePicker mode="time" value={new Date()} display='spinner' minuteInterval={30} positiveButton={{label: 'OK'}} onChange={handleTimeChange}/> )}
                   <Text style={{marginRight: '15%', marginTop: '4%'}}>{HeureChoisiedebut}</Text>
                 </View>
                 <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button style={{marginLeft: '12%', marginBottom: '1%',fontSize: 16,  backgroundColor: CouleurBouton}} onPress={() => setShowPicker2(true)}><Text>Heure de Fin</Text></Button>
                   {showPicker2 && ( <DateTimePicker mode="time" value={new Date()} display='spinner' minuteInterval={30} positiveButton={{label: 'OK'}} onChange={handleTimeChange2}/> )}
                   <Text style={{marginRight: '15%'}}>{HeureChoisieFin}</Text>
                 </View>
                </View>):(
                    <View style={{height: verticalScale(140), marginTop: '5%', flexDirection: 'column'}}>
                      {/*<Text style={{fontFamily: 'PoppinsBlack', color: 'grey', marginLeft: '2%', fontSize: 13, textAlign: 'center'}}>Modifiez le numéro du J OU la date pour choisir quand rajouter un J supplémentaire</Text>
                      <View style={{marginTop: '4%', marginHorizontal: '2.5%', flexDirection: 'row', paddingVertical: '4%', borderBottomWidth: 0.5, borderColor: 'grey', borderTopWidth: 0.5, }}>
                        <Text style={{fontFamily: 'PoppinsBlack', fontSize: 14, marginTop: '1%'}}>Numéro du nouveau J</Text>
                        <TextInput 
                          style={{ fontSize: 14, flex: 3, marginLeft: '8%', fontFamily: 'PoppinsBlack'}}
                          textAlign={'center'}
                          placeholder= {'entrez numéro J'}
                          value={numeroNouveauJ}
                          keyboardType='numeric'
                          maxLength={3}
                          placeholderTextColor={TextColor}
                          color= {TextColor}
                          onChangeText={(texteSaisi) => {
                            setnumeroNouveauJ(texteSaisi)
                            calculnouvelledate(texteSaisi)
                          }} 
                        />
                      </View>
                      <View style={{marginTop: '4%', marginHorizontal: '2.5%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Text style={{fontFamily: 'PoppinsBlack', fontSize: 14, marginRight: '15%', marginTop: '1%'}}>Date du nouveau J</Text>
                        <Pressable style={styles.choisir_date_J0_touchable} onPress={() => setisDatePickerVisible(true)}>
                          <Text style={{fontSize: 12}}>
                            {dateNouveauJ}
                          </Text>
                        </Pressable>
                        <DateTimePickerModal
                          startFromMonday = {true}
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                          onDateChange = {onDateChange}
                          minimumDate={new Date()}
                        />
                      </View>*/}
                      <Text style={{textAlign: 'center'}}>En cours de développement, arrive très prochainement</Text>
                    </View>
                )}
              </View>
            </ConfirmDialog>
            <ConfirmDialog
              dialogStyle = {{borderRadius : 10, backgroundColor: CouleurBouton}}
              contentStyle ={{padding:0, paddingTop: 0, backgroundColor: CouleurFond}}
              buttonsStyle = {{backgroundColor: CouleurBouton, borderBottomEndRadius: 10, borderBottomLeftRadius: 10}}
              titleStyle= {{textAlign: 'center', paddingBottom: '4%', color: TextColor}}
              animationType="fade"
              title="Paramètres"
              message="Are you sure about that?"
              keyboardShouldPersistTaps="handled"
              visible={ParamètresVisible}
              onTouchOutside={() => {setParamètresVisible(false)}}
              positiveButton={{
                style: {color: TextColor} ,
                  title: "OK",
                  onPress: () => {
                    if (DisplayNomFiche === true){
                      dispatch(informationaAfficherSlice.actions.NomFiche());
                    }
                    if (DisplayNomFiche === false){
                      dispatch(informationaAfficherSlice.actions.MatiereFiche());
                    }
                    if (DisplayCouleurfiche === true){
                      dispatch(CouleuraAfficherSlice.actions.CouleurMatiere());
                    }
                    if (DisplayCouleurfiche === false){
                      dispatch(CouleuraAfficherSlice.actions.CouleurJ());
                    }
                    
                    setParamètresVisible(false);
                  }
              }}
              negativeButton={{
                style: {color: TextColor} ,
                  title: "annuler",
                  onPress: () => {
                    setParamètresVisible(false); 
                  }
              }}>
              <View style={{flexDirection: 'column', paddingLeft:'3%'}}>
                <View style= {{marginVertical: '3%', flexDirection: 'row'}}>
                  <View style={{flex: 1.2, alignItems: 'flex-start', justifyContent:'center'}}>
                    <Text>Informations à afficher</Text>
                  </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <Button style={DisplayNomFiche ? [styles.DisplayNomFicheTrue, {backgroundColor: CouleurActive}] : [styles.DisplayNomFicheFalse, {backgroundColor: CouleurSwitchOff}]} onPress={() => setDisplayNomFiche(true)} >
                        <Text style={{fontSize: 12,color: DisplayNomFiche ? 'black' : TextColor}}>Nom de la fiche</Text>
                      </Button>
                      <Button style={DisplayNomFiche ? [styles.DisplayNomFicheFalse, {backgroundColor: CouleurSwitchOff}] : [styles.DisplayNomFicheTrue, {backgroundColor: CouleurActive}]}  onPress={() => {setDisplayNomFiche(false)}}>
                        <Text  style={{fontSize: 12, color: DisplayNomFiche ? TextColor : 'black'}}>Matiere de la fiche</Text>
                      </Button>
                    </View>
                </View>
                <View style= {{marginVertical: '3%', flexDirection: 'row'}}>
                  <View style={{flex: 1.2, alignItems: 'flex-start', justifyContent:'center'}}>
                    <Text>Couleur à afficher</Text>
                  </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <Button style={DisplayCouleurfiche ? [styles.DisplayCouleurFicheTrue, {backgroundColor: CouleurActive}] :[ styles.DisplayCouleurFicheFalse, {backgroundColor: CouleurSwitchOff}]} onPress={() => setDisplayCouleurfiche(true)} >
                        <Text style={{fontSize: 12,color: DisplayCouleurfiche ? 'black' : TextColor}}>Couleur de la Matière</Text>
                      </Button>
                      <Button style={DisplayCouleurfiche ?[ styles.DisplayCouleurFicheFalse, {backgroundColor: CouleurSwitchOff}] : [styles.DisplayCouleurFicheTrue, {backgroundColor: CouleurActive}]}  onPress={() => {setDisplayCouleurfiche(false)}}>
                        <Text  style={{fontSize: 12, color: DisplayCouleurfiche ? TextColor : 'black'}}>Couleur du J</Text>
                      </Button>
                    </View>
                </View>
              </View>
        </ConfirmDialog>
          <View style={styles.style_des_deux_box}>
            <View style={[styles.box_jour_1, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_1_id_a_afficher} renderItem={renderItem}/>
            </View>
            <View style={[styles.box_jour_2, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_2_id_a_afficher} renderItem={renderItem2Wrapp(jour_2)}/>
            </View>
            <View style={[styles.box_jour_2, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_3_id_a_afficher} renderItem={renderItem2Wrapp(jour_3)}/>
            </View> 
            <View style={[styles.box_jour_2, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_4_id_a_afficher} renderItem={renderItem2Wrapp(jour_4)}/>
            </View>           
            <View style={[styles.box_jour_2, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_5_id_a_afficher} renderItem={renderItem2Wrapp(jour_5)}/>
            </View> 
            <View style={[styles.box_jour_2, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_6_id_a_afficher} renderItem={renderItem2Wrapp(jour_6)}/>
            </View> 
            <View style={[styles.box_jour_2, {backgroundColor: CouleurFond}]}>
              <FlatList data={box_7_id_a_afficher} renderItem={renderItem2Wrapp(jour_7)}/>
            </View> 
          </View>   
          <View style={styles.style_du_changer_jour_view}>    
          <TouchableOpacity style={[styles.style_du_changer_jour_touchable1, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]} onPress={() => navigation.navigate('2J')}><Text style={styles.style_des_text_du_choix_nb}>2J</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_du_changer_jour_touchable2, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]} onPress={() => navigation.navigate('4J')}><Text style={styles.style_des_text_du_choix_nb}>4J</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_du_changer_jour_touchable2, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]}  onPress={() => navigation.navigate('7J')}><Text style={styles.style_des_text_du_choix_nb}>7J</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_du_changer_jour_touchable3, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]}  onPress={() => setParamètresVisible(true)}><Ionicons name="settings-outline" size={23}/></TouchableOpacity>
          </View>
          <StatusBar backgroundColor='#789AFF' />     
        </View>
      </GestureDetector>
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
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: '1%'
  },

  haut_total:{
    flexDirection: 'column',
    flex: 2.3,
  },

  haut_icone_passer:{
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  style_des_deux_box:{
    flex: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  text_jours:{
    fontSize:11
  },

  jour_1: {
    backgroundColor: 'white',
    flex:  1,
    alignItems: 'stretch',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: 'black'
  },

  jour_2: {
    backgroundColor: 'white',
    flex:  0.99,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#C5C5C5',
    borderRightWidth: 0.75
  },

  jour_2_1: {
    backgroundColor: 'white',
    flex:  1.005,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#C5C5C5',
    borderRightWidth: 0.75
  },

  box_jour_1:{
    flex: 1,
    backgroundColor: 'white'
  },

  box_jour_2 : {
    flex: 1,
    backgroundColor: 'white',
    borderLeftWidth: 0.75,
    borderColor: '#C5C5C5'
  },

  text_jour_2:{
    flex: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6D6D6'
  },

  icon_jour_2:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(175),
    backgroundColor: '#D6D6D6',
  },

  text_jour_1:{
    flex: 4, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6D6D6'
  },

  icon_jour_1:{
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: scale(175),
    backgroundColor: '#D6D6D6',
  },

  style_flat_list_box:{
    flex: 1, 
    height : verticalScale(30),
    marginTop: '2%',
    alignItems: 'stretch',
    borderRadius: 5,
    marginHorizontal: '2%',
    flexDirection: 'row',
  },

  style_des_view_des_3_éléments_rendus_1:{
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },

  style_des_view_des_3_éléments_rendus_2:{
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  style_des_view_des_3_éléments_rendus_3:{
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },

  style_du_changer_jour_touchable1: {
    backgroundColor: '#789AFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: scale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center'
  },

  style_du_changer_jour_touchable2: {
    backgroundColor: '#789AFF',
    width: scale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },

  style_du_changer_jour_touchable3: {
    backgroundColor: '#789AFF',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: scale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',    
  },

  style_du_changer_jour_view: {
    position: 'absolute', 
    height: verticalScale(50),
    top: '85%',
    right: '35%',
    width: '20%',
    borderRadius: 20,
    width: scale(150),
    flexDirection: 'row'
  },

  style_des_text_du_choix_nb:{
    fontSize: 20,
    color: 'black'
  },

  viewajoutcalendar:{
    padding: 0,
  },

  choixjourcalendrierpressed:{
    backgroundColor: '#78BBD0', 
    width: scale(153), 
    borderRadius: 10,
  },

  choixjourcalendrierNOpressed:{
    width: scale(153),
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },

  troisBouttonsduhautPRESSED:{
    backgroundColor: '#78BBD0', 
    width: scale(210), 
    marginVertical:'1%',
    borderRadius: 10,
  },

  troisBouttonsduhautNOPRESSED: {
    width: scale(210),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },

  addCalendarNoPressed:{
    marginLeft: '1%',
    width: scale(98),
    height: verticalScale(36),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
    flexDirection:'column',
    alignItems: 'center', 
    justifyContent: 'center',  
  },

  addCalendarPressed:{
    marginLeft: '1%',
    width: scale(98),
    height: verticalScale(36),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
    flexDirection:'column',
    alignItems: 'center', 
    justifyContent: 'center',  
  },

  DisplayNomFicheTrue:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
  },

  DisplayNomFicheFalse:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },

  DisplayNomFicheTrue:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
  },

  DisplayNomFicheFalse:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },

  DisplayNomFicheTrue:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
  },
  DisplayNomFicheFalse:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },

  DisplayCouleurFicheTrue:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
  },

  DisplayCouleurFicheFalse:{
    marginLeft: '1%',
    width: scale(130),
    height: verticalScale(30),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },
  choisir_date_J0_touchable:{
    borderWidth : 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 7,
  },


});
