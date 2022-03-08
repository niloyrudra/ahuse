import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity, Dimensions } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker,Callout, CalloutSubview } from 'react-native-maps'

import { COLORS, SIZES, FONTS } from '../../constants/theme'
import icons from '../../constants/icons';
import IconButton from '../../components/IconButton';
// import { TouchableOpacity } from 'react-native-gesture-handler';

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
            // console.log(route.params.item)
            setProperty(route.params.item)
            setRegion({
                latitude: parseFloat(route.params.item.latitude), // 37.78825
                longitude: parseFloat(route.params.item.longitude), // -122.4324
                latitudeDelta: 0.0125, // 0.0922
                longitudeDelta: 0.0125, // 0.0421
            })
        }
        return () => setRegion({})
    }, [route.params.item.id])

    // Handler
    const onRegionChangeHandler = ( region ) => {
        // setRegion( region.setValue(region) )
        setRegion( region )
    }

    return (
        <View
            style={{
                flex: 1,
                    backgroundColor: COLORS.white,
                    // position:"relative",
                    // ...animatedStyle
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
                mapType="standard" // hybrid
                region={region}
                // initialRegion={region}
                provider={PROVIDER_GOOGLE}
                // customMapStyle={mapStyle}
                showsUserLocation={true}
                zoomEnabled={true}
                showsCompass={true}
                showsScale={true}
                // cacheEnabled={true}
                // loadingEnabled={true}
                // onRegionChange={onRegionChangeHandler}
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
                    // image={icons.locationPin}
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
                            {/* <Text
                                style={{
                                    // flex:1,
                                    // height:100,
                                    // width:"100%",
                                    // backgroundColor:COLORS.lightGray2,
                                    marginBottom:10
                                }}
                            > */}
                                {/* <Image
                                    source={{uri:property?.thumbnail}}
                                    // source={{uri:"https://niloyrudra.com/workshop/ahuse/wp-content/uploads/2014/05/blue-1-2-250x220.jpg"}}
                                    resizeMode="cover"
                                    style={{
                                        flex:1,
                                        height:100,
                                        width:'100%',
                                        backgroundColor:COLORS.lightGray2,
                                    }}
                                /> */}
                            {/* </Text> */}
{/*  */}
                            <Text style={{...FONTS.h2}}>{property?.title}</Text>
                            <Text style={{...FONTS.h3}}>{property?.address}</Text>
                            <Text  style={{...FONTS.h4}}>Lat:{region?.latitude}, Lon:{region?.longitude}</Text>
                        </View>
                    </Callout>
                </Marker>

                {/* <Marker
                    key={`Marker-${property.id}`}
                    coordinate={{latitude:parseFloat(region?.latitude),longitude:parseFloat(region?.longitude)}}
                    title={property?.title}
                    description={property?.address}
                >

                    <Image source={icons.locationPin} style={{height: 35, width:35, tintColor:COLORS.black }} />

                </Marker> */}

            </MapView>
        </View>
    )
}

export default SingleMapScreen

const styles = StyleSheet.create({})
