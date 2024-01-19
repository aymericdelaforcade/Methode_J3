import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { scale, verticalScale} from 'react-native-size-matters';
import { TimelineCalendar, MomentConfig} from '@howljs/calendar-kit';
import moment from "moment";
import { showMessage } from 'react-native-flash-message';

import { journeeajdSlice } from '../redux/reducers/reducMajournéeajd';
import { Button } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

//changer l'affichage de l'évent en fonction des jours

import "moment/locale/fr"

export default function MaJournée() {

  const event = useSelector((state) => state.events.events)
  const dispatch = useDispatch();  

  const [viewMode2, setviewMode2] = useState('day') 
  const [hauteurDialog, sethauteurDialog] = useState(verticalScale(220)) 
  const [dialogVisible, setdialogVisible] = useState(false);
  const [suppSelected, setsuppSelected] = useState(false);
  const [afficherdeplace, setafficherdeplace] = useState(true);
  const [infoEventstart, setinfoEventstart] = useState('');
  const [infoEventEnd, setinfoEventEnd] = useState('');
  const [ajdselected, setajdselected] = useState(true);

  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)

  const [idEventenCours, setidEventenCours] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [HeureChoisiedebut, setHeureChoisiedebut] = useState('00:00');
  const [HeureChoisieFin, setHeureChoisieFin] = useState('00:00');

  const CouleurSwitchOff= useSelector((state) => state.Test.CouleurSwitchOff)


  const handleTimeChange = (event, selectedDate) => {
    setShowPicker(false)
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


  const renderEvent = ({event}) => {


    let Eventdecoupe = event.title.split('_')

    return(
      <View style={styles.viewEvent}>
        <View style={styles.viewquiWrappText}>
          <View style={[styles.dun_splitEvent, {marginLeft: '2%'}]}>
            <Text style={[styles.text_event, {fontWeight: 'bold'}]}>{Eventdecoupe[0]}</Text>
          </View>
          <View style={[styles.dun_splitEvent, {marginLeft: '0%'}]}>
            <Text style={[styles.text_event, {fontWeight: 'bold'}]}>{Eventdecoupe[1]}</Text>
          </View>
          <View style={[styles.dun_splitEvent, {marginLeft: '2%', width: '40%'}]}>
            <Text adjustsFontSizeToFit={true} numberOfLines={1}>{Eventdecoupe[2]}</Text>
          </View>
          <View style={[styles.dun_splitEvent, {marginLeft: '2%'}]}>
            <Text style={styles.text_event}>{Eventdecoupe[3]}</Text>
          </View>
          <View style={[styles.dun_splitEvent, {marginLeft: '2%'}]}>
            <Text style={styles.text_event}>{Eventdecoupe[4]}</Text>
          </View>
        </View>
      </View>
    )
  }

    return(
        <View style={[styles.principal, {backgroundColor: CouleurFond}]}>
          <TimelineCalendar           
            locale="fr"
            viewMode= {viewMode2}
            start={5} 
            end={25} 
            hourWidth={65} 
            isShowHalfLine={false}
            events={event}
            allowPinchToZoom
            containerStyle = {{alignItems: 'center', justifyContent: 'center'}}
            renderEventContent  ={(event) => renderEvent({event})}
            onPressEvent={() => {
              setinfoEventstart(event[0].start)
              setinfoEventEnd(event[0].end)
              setidEventenCours(event[0].id)
              setdialogVisible(true)
              setajdselected(true)
              }}
              theme={{
                backgroundColor: CouleurFond,
              }}
          />
          <View style={styles.style_du_changer_jour_view}>    
            <TouchableOpacity style={[styles.style_du_changer_jour_touchable1, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]} onPress={() => setviewMode2('day')}><Text style={styles.style_des_text_du_choix_nb}>1J</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_du_changer_jour_touchable2, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]} onPress={() => setviewMode2('threeDays')}><Text style={styles.style_des_text_du_choix_nb}>3J</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.style_du_changer_jour_touchable3, {backgroundColor: DarkMode ? CouleurActive: CouleurBouton}]} onPress={() => setviewMode2('week')}><Text style={styles.style_des_text_du_choix_nb}>7J</Text></TouchableOpacity>
          </View>   
          <ConfirmDialog
            dialogStyle = {{borderRadius : 10, backgroundColor: '#00A0D3'}}
            contentStyle ={{padding:0, paddingTop: 0, backgroundColor: 'white'}}
            buttonsStyle = {{backgroundColor: '#78BBD0', borderBottomEndRadius: 10, borderBottomLeftRadius: 10}}
            animationType="fade"
            title="Modifier l'évènement"
            titleStyle= {{textAlign: 'center', justifyContent: 'center', marginBottom: '2%'}}
            message="Are you sure about that?"
            keyboardShouldPersistTaps="handled"
            visible={dialogVisible}
            onTouchOutside={() => {setdialogVisible(false),setsuppSelected(false)}}
            positiveButton={{
                title: "OK",
                onPress: () => {
                  if (suppSelected == true){
                    dispatch(journeeajdSlice.actions.retirer(idEventenCours))
                    showMessage({ message: "J retiré de l'agenda", backgroundColor: '#FF0000', style:{alignItems: 'center', justifyContent: 'center'}})
                  }
                  if (suppSelected == false){
                    dispatch(journeeajdSlice.actions.modifier([idEventenCours, HeureChoisiedebut, HeureChoisieFin, ajdselected]))
                  }
                  setdialogVisible(false)
                  setidEventenCours('')
                  sethauteurDialog(verticalScale(220))
                  setsuppSelected(false)
                  setHeureChoisiedebut('00:00')
                  setHeureChoisieFin('00:00')
                }
            }}
            negativeButton={{
                title: "annuler",
                onPress: () => {
                  setdialogVisible(false)
                  sethauteurDialog(verticalScale(220))
                  setsuppSelected(false)
                  setHeureChoisiedebut('00:00')
                  setHeureChoisieFin('00:00')
                }
            }}>
            <View style={[styles.view_princ_changer_event, {height: hauteurDialog}]}>
              <View style={styles.view_suppouModibouttons}>
                <Button style={suppSelected ? styles.suppNon : styles.suppOui} onPress={() => {setsuppSelected(true); setafficherdeplace(false); sethauteurDialog(verticalScale(45))}}><Text style={{color: 'black', fontSize: 13}}>Supprimer l'évènement</Text></Button>
                <Button style={suppSelected ? styles.suppOui : styles.suppNon} onPress={() => {setsuppSelected(false); setafficherdeplace(true); sethauteurDialog(verticalScale(220))}}><Text style={{color: 'black', fontSize: 13}}>Déplacer l'évènement</Text></Button>
              </View>
              {afficherdeplace &&(
                <View styles={styles.viewDeplaceEvent}>
                  <View style={styles.view_AjdouDemain}>
                    <Button style={ajdselected ? styles.suppOui : styles.suppNon} onPress={() => setajdselected(false)} ><Text style={{color: 'black', fontSize: 13}}>Aujourd'hui</Text></Button>
                    <Button style={ajdselected ? styles.suppNon : styles.suppOui}  onPress={() => {setajdselected(true)}}><Text style={{color: 'black', fontSize: 13}}>Demain</Text></Button>
                  </View>
                  <View style={styles.anciennesHoraires}>
                    <View style={{marginTop: '5%'}}>
                      <Text style={{fontSize: 15}}>Anciennes horaires</Text>
                    </View>
                    <View style={{height: verticalScale(50),justifyContent: 'space-evenly'}}>
                      <Text style={{fontSize: 15}}>{moment(infoEventstart).format('HH:mm')}</Text>
                      <Text style={{fontSize: 15}}>{moment(infoEventEnd).format('HH:mm')}</Text>
                    </View>
                  </View>
                  <View style={[styles.anciennesHoraires, {marginTop: '5%'}]}>
                    <View style={{marginTop: '7%'}}>
                      <Text style={{fontSize: 15}}>Nouvelles horaires</Text>
                    </View>
                    <View style={{height: verticalScale(50),justifyContent: 'space-evenly'}}>
                      <Button style={{marginLeft: '8%', marginBottom: '2%', marginTop: '5%',fontSize: 16}} onPress={() => setShowPicker(true)}><Text style={{textDecorationLine: 'underline'}}>{HeureChoisiedebut}</Text></Button>
                      {showPicker && ( <DateTimePicker mode="time" value={new Date()} display='spinner' minuteInterval={30} positiveButton={{label: 'OK'}} onChange={handleTimeChange}/> )}
                      <Button style={{marginLeft: '8%', marginBottom: '1%',fontSize: 16}} onPress={() => setShowPicker2(true)}><Text style={{textDecorationLine: 'underline'}}>{HeureChoisieFin}</Text></Button>
                      {showPicker2 && ( <DateTimePicker mode="time" value={new Date()} display='spinner' minuteInterval={30} positiveButton={{label: 'OK'}} onChange={handleTimeChange2}/> )}
                    </View>
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
    alignItems: 'stretch'
  },

  
  style_du_changer_jour_view: {
    position: 'absolute', 
    height: verticalScale(50),
    top: '85%',
    right: '29%',
    width: '20%',
    borderRadius: 20,
    width: scale(150),
    flexDirection: 'row'
  },

  style_du_changer_jour_touchable1: {
    backgroundColor: '#78BBD0',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: scale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center'
  },

  style_du_changer_jour_touchable2: {
    backgroundColor: '#78BBD0',
    width: scale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },

  style_du_changer_jour_touchable3: {
    backgroundColor: '#78BBD0',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: scale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',    
  },

  
  style_des_text_du_choix_nb:{
    fontSize: 20,
    color: 'black'
  },

  view_princ_changer_event:{
    flexDirection: 'column'
  },

  viewEvent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row'
  },

  dun_splitEvent:{
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewquiWrappText:{
    flexDirection: 'row',
    width: '70%',
    alignItems: 'stretch',
  },

  text_event:{
    fontSize: 20
  },

  suppOui:{
    backgroundColor: '#ECECEC', 
    width: scale(145), 
    borderRadius: 10,
  },

  suppNon:{
    width: scale(145),
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
  },

  view_suppouModibouttons:{
    flexDirection: 'row',
    marginTop: '2%',
    marginHorizontal: '2%',
    justifyContent: 'space-around'
  },

  anciennesHoraires:{
    marginTop: '1%', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },

  view_AjdouDemain:{
    flexDirection: 'row',
    marginTop: '1%',
    paddingVertical: '2%',
    marginHorizontal: '2%',
    justifyContent: 'space-around'
  }
});

