import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { StockageSlice } from '../redux/reducers/reducStockageJ';
import { useSelector } from 'react-redux';
import { BarChart, PieChart } from "react-native-gifted-charts";
import { useState, useEffect} from 'react';
import { listeSlice } from '../redux/reducers/reducListeJ';
import  Icon  from 'react-native-vector-icons/Feather';


export default function Graphiques() {

  const CouleurFond = useSelector((state) => state.Test.CouleurFond)
  const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)
  const CouleurBouton2 = useSelector((state) => state.Test.CouleurBouton2)
  const TextColor =  useSelector((state) => state.Test.CouleurText)
  const DarkMode =  useSelector((state) => state.Test.Dark)


    const moment = require('moment');

    const mois = ['rien','Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    const stockage_des_J = useSelector((state) => state.stockage_des_J.stockage_des_J)
    const [Lundi, setLundi] = useState(0);
    const [Mardi, setMardi] = useState(0);
    const [Mercredi, setMercredi] = useState(0);
    const [Jeudi, setJeudi] = useState(0);
    const [Vendredi, setVendredi] = useState(0);
    const [Samedi, setSamedi] = useState(0);
    const [Dimanche, setDimanche] = useState(0);
    const  [changementAsynchroneFait, setchangementAsynchroneFait] = useState(false)
    const [LundiInfos, setLundiInfos]= useState([])
    const [DiamncheInfos, setDiamncheInfos]= useState([])

    const [Jouràenlever, setjouràenlever] = useState(0);

    const [J0_J2, setJ0_J2] = useState(0);
    const [J3_J7, setJ3_J7] = useState(0);
    const [J8_J15, setJ8_J15] = useState(0);
    const [J16_J30, setJ16_J30] = useState(0);
    const [suppéJ30, setsuppéJ30] = useState(0);

    const [ratiosuppJ15, setratiosuppJ15] = useState(0);

    const barData = [{value: Lundi, label: 'L'}, 
                    {value: Mardi, label: 'M'}, 
                    {value: Mercredi, label: 'M'}, 
                    {value: Jeudi, label: 'J'}, 
                    {value: Vendredi, label: 'V'}, 
                    {value: Samedi, label: 'S'}, 
                    {value: Dimanche, label: 'D'}
    ];

    const pieData = [
        {value: J0_J2, color: '#FF0000', text: 'J0-J1'},
        {value: J3_J7, color: '#FF6400', text: 'J2-J7'},
        {value: J8_J15, color: '#FFB600', text: 'J7-J14'},
        {value: J16_J30, color: '#55FF00', text: 'J14-J30'},
        {value: suppéJ30, color: '#00B508', text: '>J30'},
    ];

    useEffect(() => {
        setLundi(0)
        setMardi(0)
        setMercredi(0)
        setJeudi(0)
        setVendredi(0)
        setSamedi(0)
        setDimanche(0)

        setJ0_J2(0)
        setJ3_J7(0)
        setJ8_J15(0)
        setJ16_J30(0)
        setsuppéJ30(0)
        setratiosuppJ15(0)

        setchangementAsynchroneFait(true)

    },[stockage_des_J, Jouràenlever]) //Attention, va se lancer à la fois quand stockage des J change mais aussi et surtout lors du démarrage !

    useEffect(() => {

        if(changementAsynchroneFait){

            let aujourdhui = new Date();
            let Arraysemaine = [];

            // Recule d’une semaine
            aujourdhui.setDate(aujourdhui.getDate() + Jouràenlever );
            // Trouve le lundi de cette semaine
            aujourdhui = new Date(aujourdhui.setDate(aujourdhui.getDate() - aujourdhui.getDay() + (aujourdhui.getDay() === 0 ? -6 : 1)));
        

            // CODE QUI PERMET D AFFICHER LES JOURS DE LA SEMAINE
            let lundi = [aujourdhui.getMonth() + 1, aujourdhui.getDate()]; // Crée un array avec le mois et le numéro du lundi
            setLundiInfos(lundi)
            // Trouve le dimanche de la même semaine
            let dateDimanche = new Date(aujourdhui); // Copie de la date du lundi pour calculer le dimanche
            dateDimanche.setDate(dateDimanche.getDate() + 6);
            let dimanche = [dateDimanche.getMonth() + 1, dateDimanche.getDate()];
            setDiamncheInfos(dimanche)
            


            // Réglez sur le lundi de la semaine courante
            //aujourdhui = new Date(aujourdhui.setDate(aujourdhui.getDate() - aujourdhui.getDay() + (aujourdhui.getDay() === 0 ? -6 : 1)));
            
            // Pour les dates de la semaine
            for (let i = 0; i < 7; i++) {
                // Formate la date en JJ-MM-AAAA
                let day = ('0' + aujourdhui.getDate()).slice(-2);
                let month = ('0' + (aujourdhui.getMonth() + 1)).slice(-2);
                let year = aujourdhui.getFullYear();
                Arraysemaine.push(`${day}-${month}-${year}`);
                // Passe au jour suivant
                aujourdhui.setDate(aujourdhui.getDate() + 1);
            }

            for (const id in stockage_des_J) { //il faut retransformer chaque liste de J fait en dates
                const numberFaits = [] // va stocker tous les numbers du J qui ont été faits
                for (const element of stockage_des_J[id].J_fait) {
                    numberFaits.push(element.numberduJ);
                }
                //const ListeDatesFaites = numberFaits.map(index => stockage_des_J[id].jour_séléctionné[index]);
                const ListeDatesFaites = []
                
                for (const index of numberFaits){
                    ListeDatesFaites.push(stockage_des_J[id].jour_séléctionné[index])
                }

                for (const element of stockage_des_J[id].date_reportée_fait) { //rajoute les J décalés faits
                    ListeDatesFaites.push(element.jour);
                }


                let dateFaitesemaineChoisie = []
                dateFaitesemaineChoisie = ListeDatesFaites.filter(element => Arraysemaine.includes(element)); //va stocker les dates des J qui ont été faite dans la semaine désirée
                if (dateFaitesemaineChoisie.length > 0) {
                    for (const dates of dateFaitesemaineChoisie){ //pour chaque date va l'ajouter à un jour précis

                        const Vraidate = moment(dates, 'DD-MM-YYYY')
                        const jourSemaine = Vraidate.day()


                        if (jourSemaine === 0){
                            setDimanche(ancien => ancien +1)
                        }
                        
                        if (jourSemaine === 1){
                            setLundi(ancien => ancien +1)
                        }
                        
                        if (jourSemaine === 2){
                            setMardi(ancien => ancien +1)
                        }
                        
                        if (jourSemaine === 3){
                            setMercredi(ancien => ancien +1)
                        }
                        
                        if (jourSemaine === 4){
                            setJeudi(ancien => ancien +1)
                        }
                        
                        if (jourSemaine === 5){
                            setVendredi(ancien => ancien +1)
                        }
                        
                        if (jourSemaine === 6){
                            setSamedi(ancien => ancien +1)
                        }
                    }
                }
            }   
            //code pour le donut 
            let dénominateur = 0
            let numérateur = 0

            for (const id in stockage_des_J) {
              const stockagedesNumbers = []
              for (const obj of stockage_des_J[id].J_fait) {
                stockagedesNumbers.push(obj.numberduJ);
              }
              stockagedesNumbers.sort((a, b) => a - b);
              tailleListesansJrajouté = stockage_des_J[id].liste_choisie.length - 1

              for (let i = stockagedesNumbers.length - 1; i >= 0; i--) { //les J reportés vont avoir un Number qui n'existe pas, ce code permet de l'enlever
                if (stockagedesNumbers[i] > tailleListesansJrajouté) {
                  stockagedesNumbers.splice(i, 1);
                }
              }
              

              let plusGrandNumber = stockagedesNumbers[stockagedesNumbers.length - 1];  //prend le plus gros number, le dernier vu que c'est trié
              let numéroDernierJFait = stockage_des_J[id].liste_choisie[plusGrandNumber]
            
              /*if (numéroDernierJFait == undefined){ //permet de gérer le cas où le dernier J fait est un J rajouté
                numéroDernierJFait = moment(stockage_des_J[id].jour_séléctionné[plusGrandNumber], 'DD-MM-YYYY').diff(moment(stockage_des_J[id].jour_séléctionné[0], 'DD-MM-YYYY'), 'days')
              }*/
              

              if (-1 <numéroDernierJFait && numéroDernierJFait< 3 ){
                setJ0_J2(ancien => ancien +1)
                dénominateur++
              }
              if (2 <numéroDernierJFait && numéroDernierJFait < 8 ){
                setJ3_J7(ancien => ancien +1)
                dénominateur++
              }
              if (7 <numéroDernierJFait && numéroDernierJFait < 16 ){
                setJ8_J15(ancien => ancien +1)
                dénominateur++
              }
              if (15 <numéroDernierJFait && numéroDernierJFait < 31 ){
                setJ16_J30(ancien => ancien +1)
                numérateur++
              }
              if (30 <numéroDernierJFait){
                setsuppéJ30(ancien => ancien +1)
                numérateur++
              }
            }
            let ratio = (numérateur/ (numérateur + dénominateur) ) * 100
            setratiosuppJ15(ratio)

            if (dénominateur == 0 && numérateur ==0){ //gère le cas du début où aucun J n'est fait
              setJ0_J2(1)
              setratiosuppJ15(0)
            }

            setchangementAsynchroneFait(false)
        }
    },[changementAsynchroneFait])


    const renderDot = color => {
        return (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: color,
              marginRight: 10,
            }}
          />
        );
      };

      const renderLegendComponent = () => {
        return (
          <>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginBottom: 10, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 80, marginRight: 20, }}>
                {renderDot('#FF0000')}
                <Text style={{color: TextColor}}>J0-J2</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', width: 70}}>
                {renderDot('#FF6400')}
                <Text style={{color: TextColor}}>J2-J7</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 80, marginRight: 20, }}>
                {renderDot('#FFB600')}
                <Text style={{color: TextColor}}>J7-J15</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', width: 80}}>
                {renderDot('#55FF00')}
                <Text style={{color: TextColor}}>J15-J30</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 80, marginRight: 20, }}>
                {renderDot('#00B508')}
                <Text style={{color: TextColor}}>{'>'}J30</Text>
              </View>
            </View>
          </>
        );
      };

    return(
      <View style={[styles.principal, {backgroundColor: CouleurFond}]}>
        {/*<View style={styles.haut_icone_passer}>
            <TouchableOpacity style={[styles.icon_jour_1, {backgroundColor: CouleurFond}]} onPress={() => {setjouràenlever(Jouràenlever => Jouràenlever - 7)}}>
                <Icon name="chevron-left" style={{fontSize: scale(35)}} color={TextColor}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.icon_jour_2, {backgroundColor: CouleurFond}]}  onPress={() => {setjouràenlever(Jouràenlever => Jouràenlever + 7)}}>
                <Icon name="chevron-right" style={{fontSize: scale(35)}} color={TextColor}/>
            </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', height: verticalScale(30), marginTop: '1%'}}>
            <Text style={{fontSize: 16}}>Lundi {LundiInfos[1]} {mois[LundiInfos[0]]} - Dimanche {DiamncheInfos[1]} {mois[DiamncheInfos[0]]}</Text>
        </View>
        <View style={{flex: 0.75, marginLeft: '2%', borderBottomWidth: 0.5, paddingBottom: '3%', borderColor: 'grey'}}>
            <BarChart data={barData}  
            frontColor={DarkMode ? '#bb86fc' : CouleurBouton}
            barWidth={24} 
            barBorderRadius={8}
            dashGap={7}
            stepHeight={44}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisColor={'grey'}
            isAnimated
            noOfSections={5}
            showLine //à voir
            lineConfig={{curved : true, hideDataPoints: true, thickness: 2, shiftY: 40, color: DarkMode ? '#bb86fc' : CouleurBouton}}
            />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.7, paddingBottom: '4%', paddingTop: '6%'}}>
            <PieChart
            donut
            textColor="black"
            radius={120}
            showTextBackground
            textBackgroundRadius={-1}
            data={pieData}
            innerRadius={85}
            innerCircleColor={CouleurFond}
            centerLabelComponent={() => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: CouleurFond}}>
                    <Text style={{color: TextColor, fontSize: 36}}>{ratiosuppJ15} %</Text>
                    <Text style={{color: TextColor, fontSize: 14}}>de J suppérieurs</Text>
                    <Text style={{color: TextColor, fontSize: 14}}>à J15</Text>
                  </View>
                );
              }}
            />
        </View>
        <View style={{flex: 0.25, marginBottom : '8%', flexDirection: 'row', marginLeft: '14%'}}>
        {renderLegendComponent()}
        </View>*/}
        <Text style={{textAlign: 'center'}}>En cours de développement arrive très prochainement</Text>
        <StatusBar backgroundColor= {DarkMode ? CouleurFond : '#789AFF'} />          
      </View>
    )
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center', //changé ici, c'était en flex start
  },

    haut_icone_passer:{
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        justifyContent: 'center',
        marginTop: '3%'
    },

    icon_jour_2:{
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(140),
        borderRadius: 20,
    },

    icon_jour_1:{
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(140),
        borderRadius: 20,
        marginRight: '3%'
    },
});

