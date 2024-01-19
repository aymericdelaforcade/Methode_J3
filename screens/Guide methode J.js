import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { StatusBar } from 'expo-status-bar';

import { useSelector, useDispatch } from 'react-redux';




export default function Guide_Mdj() {

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)
  const CouleurSwitchOff= useSelector((state) => state.Test.CouleurSwitchOff)

    return(
      <View style={[styles.principal, {backgroundColor: CouleurFond}]}>
        <View style={styles.titre}>
            <Text style={{fontSize: 20, backgroundColor: CouleurFond}}>Principe de la méthode des J</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: '3%', marginBottom: '2%', backgroundColor: CouleurFond}}>
            <Text style={{fontSize: 17, textAlign: 'justify'}}>La méthode des J est basé sur le principe de la répétition espacée: un cours va être revu plusieurs fois afin de l'ancrer le plus 
            possible dans la mémoire.{"\n"}
            Le principe est de faire plusieurs piqûres de rappel sur chacun des cours du programme à des intervalles calculés en jours à partir du jour du cours.
            Au début le cours sera revu très régulièrement puis de moins en moins 
            </Text>
        </View>
        <View style={{height: verticalScale(170), justifyContent: 'center', alignItems: 'center'}}>
            <Image
            source={require('../assets/methodeJ.png')}
            style={styles.image}
            />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: '3%', marginBottom: '2%',  backgroundColor: CouleurFond}}>
            <Text style={{fontSize: 17, textAlign: 'justify'}}>
                Par exemple si un cours a été vu la première fois un lundi, il faudra le revoir: {"\n"}
                → Le mardi (J1){"\n"}
                → Le jeudi (J3){"\n"}
                → Le samedi (J5){"\n"}
                → Le lundi d'après (J7){"\n"}
                → Puis tout les 15 jours{"\n"}{"\n"}
                A noter que cette liste peut varier en fonction des personnes mais le principe reste le même

            </Text>
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
  titre:{
    height: verticalScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
  },
  image:{
    flex: 1,
    resizeMode: 'contain'
  }
});

