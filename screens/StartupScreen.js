import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from "../storage/actions/auth";
//No olvidar importar el usedispatch para acceder a las acciones del store

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin= async () => {
            const userDta = await AsyncStorage.getItem('userData');
            
            if(!userDta){
                //props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL)
                return;
            }

            const transformedData = JSON.parse(userDta);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId ){
                props.navigation.navigate('Auth');
                return;
            }

            //props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token));
            
        }
        
        tryLogin();
    },[dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
