import React from "react";
import { View, Text, Alert} from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters";
import { useSelector, useDispatch } from 'react-redux';

const CustomDrawer = (props) =>{

    const CouleurFond = useSelector((state) => state.Test.CouleurFond)
    const DarkMode =  useSelector((state) => state.Test.Dark)
    const CouleurBouton = useSelector((state) => state.Test.CouleurBouton)

    return(
        <View style={{flex: 1, backgroundColor: CouleurFond}}>
            <View style={{flex: 0.09,alignItems: 'center', justifyContent: 'flex-end', backgroundColor : DarkMode ? CouleurFond : CouleurBouton}}>
            </View>
            <View style={{flex: 1, marginTop: '8%'}}>
                <DrawerContentScrollView {...props} contentContainerStyle = {{ padding: 0, marginTop: '-8%', justifyContent:'center'}}>
                    <DrawerItemList {...props}/>
                </DrawerContentScrollView>
            </View>
           <View style={{flex: 0.08, alignItems: 'center', justifyContent: 'center', backgroundColor : CouleurFond}}>
                <TouchableOpacity style={[{marginBottom: '0.5%', alignItems:'center', justifyContent: 'center', borderTopWidth: 0.5, borderColor: 'grey'}]} onPress={() => Alert.alert( "Signaler un problème ou faire des suggestions", "Merci d'envoyer un mail à: \n\n methodedesj2@gmail.com \n\n Merci !", [ { text: 'OK', }], { cancelable: true } ) }>
                <Text style={{color: 'grey', textAlign: 'center'}}>
                    Signaler un problème, suggérer des améliorations
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer