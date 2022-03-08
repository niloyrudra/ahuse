import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location';
import { FONTS } from '../constants/theme';
import constants from '../constants/constants';

const UserLocation = ({containerStyle, labelStyle}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        try{
          let { coords } = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.BestForNavigation});

          if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude
            });

            // console.log("address response",response);
        
            for (let item of response) {
              let address = `${item.street}, ${item.postalCode}, ${item.city}`.replace(/[\"]/g,"");
              // let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        
              setLocation(address);
            }
          }
        }
        catch(err) {
            setErrorMsg('No location was found!');
            console.log(err)
        }
      })();
    }, []);
  
    React.useEffect(() => {
      (async () => { if(location) await AsyncStorage.setItem("userLocation", location) })()
    },[location])

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  
    return (
      <View style={{...containerStyle}}>
        <Text style={{...labelStyle}}>{text}</Text>
      </View>
    );
}

export default UserLocation

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    paragraph:{
        ...FONTS.body3
    }
})
