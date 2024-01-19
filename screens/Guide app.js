import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native';
import { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { Button } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { useSelector, useDispatch } from 'react-redux';




export default function Guide_app() {

  const [CalendrierouAgenda, setCalendrierouAgenda] = useState(1)

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)
  const CouleurActive = useSelector((state) => state.Test.CouleurActive)
  const CouleurSwitchOff= useSelector((state) => state.Test.CouleurSwitchOff)

    return(
      <View style={{flex: 1,paddingBottom: '5%', paddingTop: '2%', backgroundColor: CouleurFond}}>
        <View style={{flexDirection: 'row', height: verticalScale(40)}}>
          <Button style={CalendrierouAgenda==0 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] : [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff }]} onPress={() => {setCalendrierouAgenda(0)}} >
            <Text style={styles.texthaut}  adjustsFontSizeToFit={true} numberOfLines={3}>Méthode des J</Text>
          </Button>
          <Button style={CalendrierouAgenda==1 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] : [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff }]} onPress={() => {setCalendrierouAgenda(1)}} >
            <Text style={styles.texthaut}  adjustsFontSizeToFit={true}>Calendrier</Text>
          </Button>
          <Button style={CalendrierouAgenda==2 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] : [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff }]} onPress={() => {setCalendrierouAgenda(2)}} >
            <Text style={styles.texthaut}>Agenda</Text>
          </Button>
          <Button style={CalendrierouAgenda==3 ? [styles.addCalendarPressed, {backgroundColor: CouleurActive}] :  [styles.addCalendarNoPressed, {backgroundColor: CouleurSwitchOff }]} onPress={() => {setCalendrierouAgenda(3)}} >
            <Text style={styles.texthaut}>Autres</Text>
          </Button>
        </View>
          {CalendrierouAgenda === 1 ? (
            <ScrollView style={{flexDirection: 'column'}}>
              <View style={{height: verticalScale(250), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Les J sont affichés en fonction de la liste choisie et du jour de J0 séléctionné {"\n"}{"\n"}
                    → En cliquant sur un J vous avez plusieurs options possibles:
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/exempleCalendar.png')}
                    style={styles.image}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(250), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Première option: si à la fin de la journée vous avez fini le J vous pouvez le marquer comme étant fait. {"\n"}{"\n"}
                    → Il est aussi possible de le marquer comme étant fait en appuyant longtemps dessus{"\n"}{"\n"}
                    → Un J marqué comme fait apparaitra plus pâle et ne sera pas reporté
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/Jfait.png')}
                    style={styles.image}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(250), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Deuxième option: si à la fin de la journée vous n'avez pas réussi à faire le J et vous ne souhaitez pas qu'il soit reporté au lendemain vous pouvez choisir de le marquer comme n'étant jamais fait. {"\n"}{"\n"}
                    → Il se comportera comme s'il était marqué comme fait mais il sera rouge
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/JjamaisFait.png')}
                    style={styles.image}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(290), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Si à la fin de la journée un J n'a pas été marqué comme fait ou comme "jamais faire", il sera automatiquement reporté au lendemain jusqu'à ce qu'il soit fait ou choisit de ne pas être fait{"\n"}
                    → Il apparaitra alors violet avec son décalage depuis la date où il aurait dû être fait {"\n"}
                    → Dans cet exemple, le J1, J3 et J5 de biocell n'ont pas été fait et sont donc reportés
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/Jdécalésexemple.png')}
                    style={{width: '98%', height: '98%', resizeMode: 'contain'}}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(100), flexDirection:'row', marginVertical: '3%'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → A noter qu'un J décalé peut aussi bien être marqué comme étant fait ou choisi de ne pas être fait {"\n"}{"\n"}
                    → Toutes ces options sont disponibles en cliquant sur le J correspondant
                  </Text>
              </View>
            </ScrollView>
          ) : CalendrierouAgenda === 2 ? (
            <ScrollView style={{flexDirection: 'column'}}>
              <View style={{height: verticalScale(270), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Vous avez la possibilité d'organiser vos J dans un agenda quotidien {"\n"}{"\n"}
                    → Pour mettre un J dans l'agenda il suffit de cliquer sur le J dans le calendrier et dans l'onglet agenda, rentrer l'heure de début et de fin
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/DialogAgenda.png')}
                    style={styles.image}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(270), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Le J apparaitra alors dans l'agenda à la date spécifiée {"\n"}{"\n"}
                    → Vous pouvez modifier son heure de début et de fin ou le supprimer en cliquant dessus
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/agenda.png')}
                    style={styles.image}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(50), flexDirection:'row', marginVertical: '3%'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → A noter que dans l'agenda il est possible de zommer ou dézoomer et de swipe pour voir les jours précédents et suivants {"\n"}{"\n"}
                  </Text>
              </View>
            </ScrollView>
          ) : CalendrierouAgenda === 0 ? (
            <ScrollView>
              <View style={[styles.principal, {backgroundColor: CouleurFond}]}>
                  <View style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: '3%', marginVertical: '2%'}}>
                      <Text style={{fontSize: 17, textAlign: 'justify'}}>La méthode des J est basé sur le principe de la répétition espacée: un cours va être revu plusieurs fois afin de l'ancrer le plus 
                      possible dans la mémoire.{"\n"}
                      Le principe est de faire plusieurs piqûres de rappel sur chacun des cours du programme à des intervalles calculés en jours à partir du jour du cours.
                      Au début le cours sera revu très régulièrement puis de moins en moins 
                      </Text>
                  </View>
                  <View style={{height: verticalScale(170), justifyContent: 'center', alignItems: 'center'}}>
                      <Image
                      source={require('../assets/methodeJ.png')}
                      style={styles.image2}
                      />
                  </View>
                  <View style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: '3%', marginBottom: '2%'}}>
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
              </ScrollView>
            ): (
            <ScrollView style={{flexDirection: 'column'}}>
              <View style={{height: verticalScale(270), flexDirection:'row', marginVertical: '3%'}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                    → Dans le menu apparait le nombre de J à faire aujourd'hui (J normaux, sauf les J0 et les J reportés) {"\n"}{"\n"}
                    → Le bouton "Ajouter un J" permet d'ajouter un J qui a été fait pour qu'il s'affiche ensuite dans le calendrier{"\n"}{"\n"}
                    → Les deux autres boutons permettent de créer une liste de J ou une matière (accèssible aussi depuis le menu en haut à gauche)
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/menu.png')}
                    style={styles.image}
                    />
                </View>
              </View>
              <View style={{height: verticalScale(50), flexDirection:'row', marginVertical: '3%'}}>
                  <Text style={{fontSize: 17, textAlign: 'justify', marginHorizontal: '2%'}}>
                  </Text>
              </View>
              <StatusBar backgroundColor='#4A79FF' /> 
            </ScrollView>
          )}
    </View>
    )
}

const styles = StyleSheet.create({
  addCalendarPressed:{
    marginLeft: '0.5%',
    width: scale(85),
    backgroundColor: '#78BBD0', 
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems:'center'
  },
  texthaut:{
    color: 'black',
  },
  addCalendarNoPressed:{
    marginLeft: '0.5%',
    width: scale(85),
    backgroundColor: '#DEDEDE', 
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems:'center'
  },
  view1:{
    flexDirection: 'column',
    height: '100%'
  },
  view2:{},
  view3:{},

  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },

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
    backgroundColor: '#78BBD0'
  },
  image2:{
    flex: 1,
    resizeMode: 'contain'
  }

});

