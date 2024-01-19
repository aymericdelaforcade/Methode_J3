import React from 'react'
import { StyleSheet, Text, View, Switch, Alert} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import {IndestructibleSlice} from '../redux/reducers/reducMrIndestructible'
import { DarkModeSlice } from '../redux/reducers/reducDarkMode';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import setDefaultProps from 'react-native-simple-default-props'



export default function Paramètres() {

    dispatch = useDispatch()
    const isEnabled = useSelector((state) => state.indestructible.indestructible)
    const DarkMode = useSelector((state) => state.Test.Dark)
    const CouleurFond = useSelector((state) => state.Test.CouleurFond)
    const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
    const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
    const TextColor =  useSelector((state) => state.Test.CouleurText)
    const CouleurActive = useSelector((state) => state.Test.CouleurActive)
  


    const changerswitch = () => {
        if (isEnabled === false){
            dispatch(IndestructibleSlice.actions.activer());

        }
        if (isEnabled === true){
            dispatch(IndestructibleSlice.actions.desactiver());
        }
    }

    const changerModecouleur = () => {
        if (DarkMode === false){
            dispatch(DarkModeSlice.actions.DarkMode());
            setDefaultProps(Text, { style: [{ fontFamily: 'PoppinsBlack', color: '#D6D6D6'}], });
        }
        if (DarkMode === true){
            dispatch(DarkModeSlice.actions.LightMode());
            setDefaultProps(Text, { style: [{ fontFamily: 'PoppinsBlack', color: '#000000'}], });
        }
    }



    return(
    <View style={[styles.principal, {backgroundColor : CouleurFond}]}>
        <View style={{flexDirection: 'row', height: scale(70), alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#0F38DC' : 'grey'}
                    onValueChange={changerswitch}
                    value={isEnabled}
                />
            <Text style={{fontSize: 20}}>Activer Mr Indestructible</Text>
            <TouchableOpacity style={styles.touchablequestion} onPress={() => Alert.alert( "", 'Allez sur le menu pour comprendre', [ { text: 'OK', }], { cancelable: true } )}>
                <Text style={{fontSize: 22}}>?</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', height: scale(70), alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '4%', borderTopWidth: 0.5, borderColor: 'grey', borderBottomWidth:0.5}}>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={DarkMode ? '#0F38DC' : 'grey'}
                    onValueChange={changerModecouleur}
                    value={DarkMode}
                />
            <Text style={{fontSize: 20, marginLeft: '4%'}}>Mode sombre</Text>
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
  touchablequestion:{
    height: verticalScale(25), 
    width: scale(25), 
    borderRadius:20, 
    justifyContent: 'center', 
    alignItems:'center'
  }
});

