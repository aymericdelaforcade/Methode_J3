import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert} from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { listeSlice } from '../redux/reducers/reducListeJ';
import { StatusBar } from 'expo-status-bar';



export default function Liste() {

  const dispatch = useDispatch();
  const liste = useSelector((state) => state.liste.liste)

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)
  const CouleurSwitchOff= useSelector((state) => state.Test.CouleurSwitchOff)

  const [dialogVisible, setdialogVisible] = useState(false); //permet d'ouvrir ou de fermer la boite de dialogue qui permet d'ajouter une matière
  const [liste_input, setliste_input] = useState('');// permet de gérer le text input qui est dans la boite de dialogue au desus, correspond au J qu'on rentre dans l'ordre
  const [liste_input2, setliste_input2] = useState('');
  const [liste_input3, setliste_input3] = useState(''); 
  const [liste_input4, setliste_input4] = useState(''); 
  const [liste_input5, setliste_input5] = useState(''); 
  const [liste_input6, setliste_input6] = useState(''); 
  const [liste_input7, setliste_input7] = useState(''); 
  const [liste_input8, setliste_input8] = useState(''); 
  const [liste_input9, setliste_input9] = useState(''); 

  const renderItem = ({item}) => { //Ce que rend la flat list qui gère la liste des matière
    return(
      <TouchableOpacity style={styles.view_render_item_principal} onPress={()=> Alert.alert( "Supprimer la liste", 'Voulez vous vraiment supprimer la liste ?', [{ text: 'annuler', },{ text: 'OK' ,onPress: () => dispatch(listeSlice.actions.supprimerListe(item)) }], { cancelable: true } ) }>
        <View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
             <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[0]}</Text>
        </View>
        <View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[1]}</Text>
        </View>
        <View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[2]}</Text>
        </View>
        <View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[3]}</Text>
        </View>
        {item[4]!== '' && (<View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ}  adjustsFontSizeToFit={true} numberOfLines={1}>J {item[4]}</Text>
        </View>)}
        {item[5]!=='' && <View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[5]}</Text>
        </View>}
        {item[6]!== '' && (<View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[6]}</Text>
        </View>)}
        {item[7]!== '' &&(<View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[7]}</Text>
        </View>)}
        {item[8]!== '' &&(<View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[8]}</Text>
        </View>)}
        {item[9]!== '' &&(<View style={[styles.view_rendre_list,{backgroundColor: CouleurBouton2}]}>
            <Text style={styles.tailletextJ} adjustsFontSizeToFit={true} numberOfLines={1}>J {item[9]}</Text>
        </View>)}
    </TouchableOpacity>
    )
  }

    return(
      <View style={[styles.principal, {backgroundColor: CouleurFond}]}>
        <View style={styles.haut2}> 
          <TouchableOpacity style={[styles.bouton_ajouter_liste, {backgroundColor: CouleurBouton}]} onPress={() => setdialogVisible(true)}>
            <Text style={styles.la_methode_des_J_comment_ça_marche_text}>
              Ajouter une liste de J
            </Text>
          </TouchableOpacity>
          <View style={{flex : 14}}>
            <FlatList data={liste} renderItem={renderItem}/>
          </View>
        </View>          
        <ConfirmDialog
          dialogStyle = {{borderRadius : 10, backgroundColor: CouleurActive}}
          contentStyle ={{padding:0, paddingTop: '1%', backgroundColor: CouleurFond, paddingBottom: '6%', justifyContent: 'center', alignItems: 'center'}}
          buttonsStyle = {{backgroundColor: CouleurBouton, borderBottomEndRadius: 10, borderBottomLeftRadius: 10}}
          titleStyle= {{textAlign: 'center', justifyContent: 'center', marginBottom: '2%'}}
          animationType="fade"
          title="Ajouter une liste de J"
          keyboardShouldPersistTaps="handled"
          visible={dialogVisible}
          onTouchOutside={() => {setdialogVisible(false); setliste_input(''); setliste_input2(''); setliste_input3('')}}
          positiveButton={{
            style: {color: TextColor} ,
              title: "ajouter",
              onPress: () => {
                
                const liste_input_values = [liste_input, liste_input2, liste_input3, liste_input4, liste_input5, liste_input6, liste_input7, liste_input8, liste_input9];
                const nonEmptyValues = liste_input_values.filter(value => value !== '');
                let isOrdered = true;
                let continuer = true
                const sontTousNonVides = liste_input_values.slice(0, 4).every(element => element !== null && element !== undefined && element !== ''); 
                const sontTousDesNombresEntiersPositifs = nonEmptyValues.every(element => { const parsedNumber = parseInt(element); return !isNaN(parsedNumber) && Number.isInteger(parsedNumber) && parsedNumber > 0; });
                  
                for (let i = 1; i < nonEmptyValues.length; i++) {
                  const nombreCourant = parseInt(nonEmptyValues[i]);
                  const nombrePrecedent = parseInt(nonEmptyValues[i - 1]);

                  if (isNaN(nombreCourant) || isNaN(nombrePrecedent) || nombreCourant <= nombrePrecedent) {
                    isOrdered = false;
                    break;
                  }
                }

                if (!sontTousNonVides){
                  Alert.alert( "Problème de remplissage", 'Merci de remplir au moins les 4 premiers J', [ { text: 'OK', }], { cancelable: true } );
                  continuer = false
                }

                if (!sontTousDesNombresEntiersPositifs){
                  Alert.alert( "Problème de chiffres", 'Merci de mettre des J entiers positifs', [ { text: 'OK', }], { cancelable: true } );
                  continuer = false
                }

                if (!isOrdered) {
                  Alert.alert( "Problème d'ordre", 'Merci de mettre les J dans un ordre croissant sans trou', [ { text: 'OK', }], { cancelable: true } );
                  continuer = false
                }
                
                if (continuer){
                  setliste_input('');
                  setliste_input2('');
                  setliste_input3('');
                  setliste_input4('');
                  setliste_input5('');
                  setliste_input6('');
                  setliste_input7('');
                  setliste_input8('');
                  setliste_input9('');
                  setdialogVisible(false);
                  dispatch(listeSlice.actions.increment([0, liste_input, liste_input2, liste_input3, liste_input4, liste_input5, liste_input6, liste_input7, liste_input8, liste_input9]));
                }
              }
          }}
          negativeButton={{
            style: {color: TextColor} ,
              title: "annuler",
              onPress: () => {
                setliste_input('');
                setliste_input2('');
                setliste_input3('');
                setliste_input4('');
                setliste_input5('');
                setliste_input6('');
                setliste_input7('');
                setliste_input8('');
                setliste_input9('');
                setdialogVisible(false); 
              }
          }}>
          <View style={styles.view_ajouter_list_boite_dialogue}>
            <View style={{marginTop: '2%'}}><Text style={styles.tailletextJ}>J   0    (J où le cours est vu )</Text></View>
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre premier J"
                value={liste_input}
                onChangeText={setliste_input}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre deuxième J"
                value={liste_input2}
                onChangeText={setliste_input2}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>  
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre troisième J"
                value={liste_input3}
                onChangeText={setliste_input3}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>     
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre quatrième J"
                value={liste_input4}
                onChangeText={setliste_input4}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>  
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre cinquième J"
                value={liste_input5}
                onChangeText={setliste_input5}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>  
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre sixième J"
                value={liste_input6}
                onChangeText={setliste_input6}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>  
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre septième J"
                value={liste_input7}
                onChangeText={setliste_input7}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View>
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre huitième J"
                value={liste_input8}
                onChangeText={setliste_input8}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View> 
            <View style={styles.view_qui_enveloppe_un_textinput}>
                <Text style={styles.tailletextJ}>J  </Text>
                <TextInput 
                marginTop ={'-1.2%'}
                maxLength= {3}
                keyboardType= 'numeric'
                placeholder="entrez votre neuvième J"
                value={liste_input9}
                onChangeText={setliste_input9}
                placeholderTextColor={TextColor}
                color= {TextColor}
                />     
            </View> 
            <View style={{marginTop: '3%', justifyContent: 'flex-start', alignItems: 'center'}}><Text style={{color: 'grey'}}>minimum de 4J</Text></View>
          </View>
        </ConfirmDialog>
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
    fontSize: 19
  },
  view_render_item_principal:{
    marginHorizontal: '4%',
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginTop: '5%'
  },
  view_ajouter_list_boite_dialogue:{
  },
  view_qui_enveloppe_un_textinput:{
    flexDirection: 'row',
    marginTop: '5%'
  },
  view_rendre_list:{
    flexDirection: 'column',
    backgroundColor: '#78BBD0',
    marginHorizontal: '0.1%',
    height: verticalScale(34),
    width: scale(34),
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    padding: 3,
  },

  tailletextJ:{
    fontSize: 16
  }
});

