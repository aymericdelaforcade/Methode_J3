import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert} from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { scale, verticalScale} from 'react-native-size-matters';
import { Button} from 'react-native-paper';

import { counterSlice } from '../redux/reducers/reducmatiere2';
import { StockageSlice } from '../redux/reducers/reducStockageJ';
import { StatusBar } from 'expo-status-bar';
import ColorPicker from 'react-native-wheel-color-picker';


// gérer le fait qu'on puisse mettre ou modifier une matière vide et une qui existe déjà

export default function Matieres() {

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)
  const CouleurSwitchOff= useSelector((state) => state.Test.CouleurSwitchOff)

  const dispatch = useDispatch();
  const matiere = useSelector((state) => state.matiere.matiere)

  const [dialogVisible, setdialogVisible] = useState(false); //permet d'ouvrir ou de fermer la boite de dialogue qui permet d'ajouter une matière
  const [dialogmodifVisible, setdialogmodifVisible] = useState(false);
  const [matièreachanger, setmatièreachanger] = useState('');
  const [couleurachanger, setcouleureachanger] = useState('');
  const [isSuppTrue, setisSuppTrue] = useState(false);
  const [modifmatiere_input, setmodifmatiere_input] = useState('');

  const [matiere_input, setmatiere_input] = useState(''); // permet de gérer le text input qui est dans la boite de dialogue au desus


  const [currentColor, setcurrentColor] = useState('#00FF00');
  const [colors2, setcolor2] = useState( ['#008000', '#000080', '#808000', '#00FFFF', '#FFFF00', '#FFA500', '#20B2AA', '#87CEEB', '#00FF7F', '#32CD32', '#F0E68C'])

  onColorChange = (color) => {
    setcurrentColor(color)
  };

  onColorChangeComplete = (color) => {
    // Handle color change complete if needed
  };



  const renderItem = ({item}) => { //Ce que rend la flat list qui gère la liste des matière
    return(
      <TouchableOpacity style={[styles.View_render_item_matiere, {backgroundColor: item[1]}]} onPress={() => {
        setdialogmodifVisible(true),
        setmatièreachanger(item[0])
        setcouleureachanger(item[1])
        setmodifmatiere_input(item[0])
      }}>
        <Text style={{color: 'black'}}>{item[0]}</Text>
      </TouchableOpacity>
    )
  }

    return(
      <View style={styles.principal}>
        <View style={[styles.haut2, {backgroundColor: CouleurFond}]}> 
          <TouchableOpacity style={[styles.bouton_ajouter_matiere, {backgroundColor: CouleurBouton}]} onPress={() => setdialogVisible(true)}>
            <Text style={styles.la_methode_des_J_comment_ça_marche_text}>
              Ajouter une matière
            </Text>
          </TouchableOpacity>
          <View style={{flex : 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {matiere.length == 0 && <Text style={{fontSize: 19}}>
                Acune matière ajoutées
              </Text>}
            </View>
            <FlatList data={matiere} renderItem={renderItem}/>
          </View>
        </View>          
        <ConfirmDialog
          dialogStyle = {{borderRadius : 10, backgroundColor: CouleurFond}}
          titleStyle= {{textAlign: 'center', color: TextColor}}
          animationType="fade"
          title="Ajouter une matière"
          message="Are you sure about that?"
          keyboardShouldPersistTaps="handled"
          visible={dialogVisible}
          onTouchOutside={() => {setdialogVisible(false); setmatiere_input(''), setmatièreachanger(''), setcurrentColor('#00FF00')}}
          positiveButton={{
            style: {color: TextColor} ,
              title: "ajouter",
              onPress: () => {
                setmatiere_input('');
                setdialogVisible(false);
                dispatch(counterSlice.actions.increment([matiere_input, currentColor]));
                setcurrentColor('#00FF00')
              }
          }}
          negativeButton={{
            style: {color: TextColor} ,
              title: "annuler",
              onPress: () => {
                setmatiere_input('');
                setdialogVisible(false); 
                setcurrentColor('#00FF00')
              }
          }}>
          <View style= {{marginVertical: '5%', flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <TextInput 
                maxLength= {30}
                placeholder="tapez ici"
                value={matiere_input}
                onChangeText={setmatiere_input}
                placeholderTextColor={TextColor}
                color= {TextColor}
              />
            </View>
            <View style={{flex: 1, backgroundColor: currentColor, marginVertical: '2%', marginRight: '5%', borderRadius: 10}}/>
          </View>
          <View style={{marginVertical: '4%'}}>
            <ColorPicker
            ref={r => { this.picker = r }}
            palette= {colors2}
            color={currentColor}
            onColorChange={onColorChange}
            onColorChangeComplete={onColorChangeComplete}
            swatchesOnly= {true}
            row ={false}
            />
          </View>
        </ConfirmDialog>
        <ConfirmDialog
          dialogStyle = {{borderRadius : 10, backgroundColor: CouleurActive}}
          contentStyle ={{padding:0, paddingTop: 0, backgroundColor: CouleurFond}}
          buttonsStyle = {{backgroundColor: CouleurBouton, borderBottomEndRadius: 10, borderBottomLeftRadius: 10}}
          titleStyle= {{textAlign: 'center', marginBottom: '2%'}}
          animationType="fade"
          title= {matièreachanger}
          keyboardShouldPersistTaps="handled"
          visible={dialogmodifVisible}
          onTouchOutside={() => {setdialogmodifVisible(false); setmodifmatiere_input(''), setisSuppTrue(false), setmatièreachanger('')}}
          positiveButton={{
              style: {color: TextColor} ,
              title: "Appliquer",
              onPress: () => {
                if (isSuppTrue){
                  Alert.alert(
                      'Supprimer une matière',
                      'Attention cela va supprimer la matière et tous les J qui sont associés à celle-ci, continuer ?',
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
                    dispatch(counterSlice.actions.supprimer(matièreachanger))
                    dispatch(StockageSlice.actions.SupprimerMatière(matièreachanger))
                  }                  
                }else{
                  dispatch(counterSlice.actions.modifier([matièreachanger, modifmatiere_input, couleurachanger]))

                }
                setdialogmodifVisible(false); 
                setmodifmatiere_input(''), 
                setmatièreachanger('')
                setisSuppTrue(false)
              }
          }}
          negativeButton={{
            style: {color: TextColor} ,
              title: "annuler",
              onPress: () => {
                setdialogmodifVisible(false); 
                setmodifmatiere_input(''), 
                setmatièreachanger('')
                setisSuppTrue(false)
              }
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Button style={isSuppTrue ? [styles.suppPressed, {backgroundColor: CouleurActive}] : [styles.suppNOpressed, {backgroundColor:CouleurSwitchOff}]} onPress={() => setisSuppTrue(true)} >
                <Text style={{color: isSuppTrue ? 'black': TextColor}}>Supprimer</Text>
              </Button>
              <Button style={isSuppTrue ? [styles.suppNOpressed, {backgroundColor: CouleurSwitchOff}]: [styles.suppPressed, {backgroundColor: CouleurActive}]}  onPress={() => {setisSuppTrue(false)}}>
                <Text  style={{fontSize: 15, color: isSuppTrue ? TextColor : 'black'}}>Modifier</Text>
              </Button>
            </View>
            {isSuppTrue ? (
              <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: '2%'}}>
                <Button style={[styles.supprimerBouton, {backgroundColor: CouleurActive}]}>
                    <Text style={{color: 'black'}}>Supprimer la matière</Text>
                </Button>
              </View>
            ) : (
            <View style={{height: verticalScale(100)}}>
              <View style={{marginVertical: '4%', flexDirection: 'row'}}>
                <TextInput 
                  maxLength= {30}
                  placeholder="tapez ici"
                  value={modifmatiere_input}
                  autoFocus
                  style={{marginVertical: '3%', marginLeft:'7%', flex: 2}}
                  onChangeText={setmodifmatiere_input}
                  placeholderTextColor={TextColor}
                  color= {TextColor}
                />
                <View style={{flex: 1, backgroundColor: couleurachanger, marginVertical: '2%', marginRight: '5%', borderRadius: 10, height: verticalScale(15), marginTop: '5%'}}/>
              </View>
              <View style={{marginHorizontal: '3%'}}>
                <ColorPicker
                  ref={r => { this.picker = r }}
                  palette= {colors2}
                  color={couleurachanger}
                  onColorChange={setcouleureachanger}
                  onColorChangeComplete={setcouleureachanger}
                  swatchesOnly= {true}
                  row ={false}
                />
              </View>
            </View>
            )}
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
  bouton_ajouter_matiere:{
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
    fontFamily: 'PoppinsBlack'
  },

  View_render_item_matiere:{
    //backgroundColor : '#78BBD0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '4%',
    height : verticalScale(40),
    marginVertical: '1%',
    borderRadius: 15,
  },

  suppNOpressed:{
    marginLeft: '1%',
    width: scale(150),
    marginVertical:'1%',
    backgroundColor: '#ECECEC', 
    borderRadius: 10,
  },

  suppPressed:{
    marginLeft: '1%',
    width: scale(150),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
  },

  supprimerBouton:{
    width: scale(200),
    marginVertical:'1%',
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
    marginVertical: '3%'
  },


});

