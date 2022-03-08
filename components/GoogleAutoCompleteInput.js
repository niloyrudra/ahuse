import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import constants from '../constants/constants';
import { COLORS,FONTS,SIZES } from '../constants/theme';

const GooglePlacesInput = ({onChange}) => {
  const [ newAddress, setNewAddress ] = useState('')
  const [ addressData, setAddressData ] = useState('')

  useEffect(() => {
    if(newAddress) {
        const getCords = () => { fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + newAddress.replace(' ', '+') + '&key=' + constants.GOOGLE_MAP_API_KEY)
                .then((response) => response.json())
                .then((responseJson) => {
                    let premise, route, postal_town, administrative_area_level_2, administrative_area_level_1, country, postal_code, address, lat, lng;
                    if(responseJson.results[0]) {
                        if( responseJson.results[0].address_components ) {
                            const addressComponents = responseJson.results[0].address_components
                            for( let i=0; i < addressComponents.length; i++ ) {
                                if( addressComponents[i].types[0] == "premise" ) premise = addressComponents[i].long_name
                                if( addressComponents[i].types[0] == "route" ) route = addressComponents[i].long_name
                                if( addressComponents[i].types[0] == "postal_town" ) postal_town = addressComponents[i].long_name
                                if( addressComponents[i].types[0] == "administrative_area_level_2" ) administrative_area_level_2 = addressComponents[i].long_name
                                if( addressComponents[i].types[0] == "administrative_area_level_1" ) administrative_area_level_1 = addressComponents[i].long_name
                                if( addressComponents[i].types[0] == "country" ) country = addressComponents[i].long_name
                                if( addressComponents[i].types[0] == "postal_code" ) postal_code = addressComponents[i].long_name
                            }
                        }
                        if( responseJson.results[0].geometry.location ) {
                            lat = responseJson.results[0].geometry.location.lat
                            lng = responseJson.results[0].geometry.location.lng
                        }
                        if( responseJson.results[0].formatted_address ) address = responseJson.results[0].formatted_address
                        setNewAddress('')
                        const data =  JSON.stringify({
                            address,
                            lat,
                            lng,
                            premise,
                            route,
                            postal_town,
                            administrative_area_level_2,
                            administrative_area_level_1,
                            country,
                            postal_code
                        });
                        console.log("ADDRESS DATA >>>> ",data)
                        onChange(data);
                    }
                })
                .catch(err => {
                    console.log("ERROR", err.message);
                    setNewAddress('');
                    return '';
                });
        };
        
        getCords();
    }
    return () => {
        // onChange('');
        setNewAddress('');
    }
  }, [newAddress]);

//   useEffect(() => console.log("====>>>> ",addressData), [addressData])

  return (
      <>
        <GooglePlacesAutocomplete
            placeholder='Select an address'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            // returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed={false}   // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                // setNewAddress(data.description)
                onChange(details.formatted_address)
            }}

            keepResultsAfterBlur={true} // Save my day

            // textInputProps={{
            //     // value: ref.current?.getAddressText()
            // }}
            getDefaultValue={() => ''}

            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: constants.GOOGLE_MAP_API_KEY,
                language: 'en', // language of the results
                // region: "CA",
                // types: '(cities)' // default: 'geocode'
                types: 'geocode',
            }}
            styles={{
                container: {
                    flex:0
                },
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    // borderTopWidth: 0,
                    // borderBottomWidth:0,
                },
                description: {
                    fontWeight: 'bold',
                },
                textInput: {
                    backgroundColor: COLORS.lightGray,
                    borderRadius:SIZES.radius,
                    borderColor: 'transparent',
                    height: 40,
                    padding: 10,
                    borderRadius: 4,
                    marginTop: 15,
                    color: COLORS.darkGray,
                    ...FONTS.body3
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                }
            }}
        
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                // type: 'food'
            }}

            GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[]}
            enablePoweredByContainer={false}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderLeftButton={() => { }}
            renderRightButton={() => { }}
        />
      </>
  );
};

export default GooglePlacesInput;