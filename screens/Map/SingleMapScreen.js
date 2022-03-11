import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity, Dimensions } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker,Callout, CalloutSubview } from 'react-native-maps'

import { COLORS, SIZES, FONTS } from '../../constants/theme'
import icons from '../../constants/icons';


const SingleMapScreen = ( { navigation, route } ) => {
    const [property, setProperty] = React.useState({})
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    React.useEffect(() => {
        if( route.params.item ) {
            setProperty(route.params.item)
            setRegion({
                latitude: parseFloat(route.params.item.latitude),
                longitude: parseFloat(route.params.item.longitude),
                latitudeDelta: 0.0125, // 0.0922
                longitudeDelta: 0.0125, // 0.0421
            })
        }
        return () => setRegion({})
    }, [route.params.item.id])

    return (
        <View
            style={{
                flex: 1,
                    backgroundColor: COLORS.white
            }}
        >
            <View
                style={{
                    position:"absolute",
                    top:SIZES.padding,
                    left:SIZES.padding,
                    zIndex:999
                }}
            >
                <TouchableOpacity
                    style={{
                        width:40,
                        height:40,
                        justifyContent:"center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: COLORS.gray2,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.white
                    }}
                    onPress={() => navigation.navigate('PropertyDetail', {item:property}) }
                >
                    <Image
                        source={icons.back}
                        style={{
                            width:20,
                            height:20,
                            tintColor:COLORS.gray2
                        }}
                    />
                </TouchableOpacity>
            </View>
                

            <MapView
                mapType="standard"
                region={region}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                zoomEnabled={true}
                showsCompass={true}
                showsScale={true}
                style={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                }}
            >
                <Marker
                    coordinate = {
                        {
                            latitude: parseFloat(region.latitude),
                            longitude: parseFloat(region.longitude)
                        }
                    }
                    pinColor = {COLORS.primary}
                >
                    <Callout>
                        <View
                            style={{
                                flex:1,
                                padding:10,
                                borderRadius:SIZES.radius
                            }}
                        >
                            <Text style={{...FONTS.h2}}>{property?.title}</Text>
                            <Text style={{...FONTS.h3}}>{property?.address}</Text>
                            <Text  style={{...FONTS.h4}}>Lat:{region?.latitude}, Lon:{region?.longitude}</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
        </View>
    )
}

export default SingleMapScreen

const styles = StyleSheet.create({})
