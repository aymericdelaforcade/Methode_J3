import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, useSelector, useDispatch, useCallback } from 'react-redux';
//import {Store} from './redux/store'
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {useEffect, useState} from 'react';

import Calendrier from './screens/Calendrier';
import Menu from './screens/Menu'
import Matieres from './screens/Matieres';
import store from './redux/store'
import Liste from './screens/Liste_J';
import MaJournée from './screens/MaJournée';
import Calendrier_4J from './screens/Calendrier_4J';
import Calendrier_7J from './screens/Calendrier_7J';
import Extraire from './screens/Extraire';
import CustomDrawer from './components/CustomDrawer';
import Guide_Mdj from './screens/Guide methode J';
import Guide_app from './screens/Guide app';
import Graphiques from './screens/graphiques';
import setDefaultProps from 'react-native-simple-default-props'


import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { counterSlice } from './redux/reducers/reducmatiere2';
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native';



import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Paramètres from './screens/Paramètres';
import * as SplashScreen from 'expo-splash-screen';
/*import { adapty } from 'react-native-adapty';*/



SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



function Menu_Calendrier ({navigation}) {

  const DarkMode = useSelector((state) => state.Test.Dark)
  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurText = useSelector((state) => state.Test.CouleurText)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)

  return(
    <View style={{flex:1}}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({ 
          headerShown: false, 
          tabBarStyle: { backgroundColor: DarkMode ? CouleurBouton : 'white'}, 
          tabActiveBackgroundColor: CouleurActive, 
          tabBarActiveTintColor: CouleurActive,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Menu" color = {CouleurActive} component={Menu_fonction} options={{headerShown : false, tabBarIcon:({ color, size }) => (<Entypo name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="Calendrier"  color = {CouleurActive} component={CalendrierScreens} options={{headerShown : false, tabBarIcon:({ color, size }) => (<MaterialCommunityIcons name="calendar-month" color={color} size={size} />)}} />
        <Tab.Screen name="Ma journée"  color = {CouleurActive} component={MaJournée} options={{headerShown : false,  tabBarIcon:({ color, size }) => (<MaterialCommunityIcons name="calendar-start" color={color} size={size} />)}} />
      </Tab.Navigator>
      <FlashMessage/>
    </View>
  );
}

const StackNavigator = createStackNavigator();

function CalendrierScreens() {
  return (
    <StackNavigator.Navigator screenOptions={{presentation: 'transparentModal'}}>
      <StackNavigator.Screen name="2J" component={Calendrier} options={{headerShown: false, gestureDirection: 'vertical'}} />
      <StackNavigator.Screen name="4J" component={Calendrier_4J} options={{headerShown: false}} />
      <StackNavigator.Screen name="7J" component={Calendrier_7J} options={{headerShown: false}} />
    </StackNavigator.Navigator>
  );
}

function Menu_fonction() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Start" component={Menu} options={{headerShown: false, gestureDirection: 'vertical'}} />
      <StackNavigator.Screen name="Guide Mdj" component={Guide_Mdj} options={{headerShown: false}} />
      <StackNavigator.Screen name="Guide App" component={Guide_app} options={{headerShown: false}} />
    </StackNavigator.Navigator>
  );
}




const  App = ({navigation}) => {

  /*useEffect(() => {
    adapty.activate('public_live_JRMmNyhO.OtwjCsWGEagPoD4A2D26');
  }, []);*/

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Counter/>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

function Counter({navigation}) {

  const dispatch = useDispatch();


  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  
  const DarkMode = useSelector((state) => state.Test.Dark)
  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurText = useSelector((state) => state.Test.CouleurText)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PoppinsBlack': require('./assets/fonts/Montserrat-Medium.ttf'),
      });
  
      // Mettre en pause l'exécution pendant 2 secondes
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }

    loadFonts();

    dispatch(counterSlice.actions.miseenformeNouvelle())

  }, []);

  //StatusBar.setBackgroundColor(CouleurFond); 
  
  useEffect(() => {

    setDefaultProps(Text, { style: [{ fontFamily: 'PoppinsBlack', color: '#D6D6D6'}], });

  }, []);

  if (!fontsLoaded) {
    return null;
  }


  return(
    <View style={{flex:1}}>
      <NavigationContainer>
          <Drawer.Navigator 
            screenOptions={({ navigation }) => ({
              drawerActiveBackgroundColor: CouleurActive, 
              drawerActiveTintColor: '#424242', 
              drawerInactiveTintColor: CouleurText,
            })}  
            drawerContent={props => <CustomDrawer {...props}/>}
            >
              <Drawer.Screen 
              name="Menu / Calendrier" 
                component={Menu_Calendrier} 
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton}, headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center',  
                drawerIcon:({ color, size }) => (<Entypo name="home" color={color} size={size} />)}} 
              />
              <Drawer.Screen 
                name="Matières" 
                component={Matieres} 
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton}, headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center',  
                drawerIcon:({ color, size }) => (<MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />)}}
              />
              <Drawer.Screen 
                name="Liste des J" 
                component={Liste} 
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton}, headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center', 
                drawerIcon:({ color, size }) => (<MaterialIcons name="format-list-numbered-rtl" color={color} size={size} />)}}
              />
              <Drawer.Screen 
                name="Graphiques" 
                component={Graphiques} 
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton},  headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center', 
                drawerIcon:({ color, size }) => (<Octicons name="graph" color={color} size={20} />)}}
              />
              <Drawer.Screen 
                name="Extraire les J" 
                component={Extraire} 
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton}, headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center', 
                drawerIcon:({ color, size }) => (<AntDesign name="export" color={color} size={size} />)}}
              />
              <Drawer.Screen 
                name="Guide de l'application" 
                component={Guide_app} 
                color = {CouleurText}
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton}, headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center', 
                drawerIcon:({ color, size }) => (<Ionicons name="map-outline" color={color} size={23} style={{marginRight: '4%'}}/>)}}
              />
              <Drawer.Screen 
                name="Paramètres" 
                component={Paramètres} 
                options={{headerStyle:{ backgroundColor: DarkMode ? CouleurFond : CouleurBouton},  headerTitleStyle: { color: CouleurText}, headerTitleAlign:'center', 
                drawerIcon:({ color, size }) => (<Ionicons name="settings-outline" color={color} size={size} />)}}
              />
          </Drawer.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default  App

