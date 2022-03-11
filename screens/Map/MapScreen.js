import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'

import { useSelector } from 'react-redux';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { COLORS, SIZES, FONTS, BOXSHADOW } from '../../constants/theme'
import icons from '../../constants/icons';
 import VerticalCard from '../../components/VerticalCard';

const MapScreen = ( { navigation, route } ) => {

    const selectedProperties = useSelector( state => state.propertyReducer.allProperties )

    const [properties, setProperties] = React.useState([])
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })

    React.useEffect(() => {

        if(selectedProperties.length) {
            setProperties(selectedProperties)
            setRegion({
                latitude: parseFloat(selectedProperties[0].latitude),
                longitude: parseFloat(selectedProperties[0].longitude),
                latitudeDelta: 1.4,
                longitudeDelta: 1.4,
            })
        }

        return () => {
            setProperties([])
            setRegion({})
        }
    }, [selectedProperties])

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
                    onPress={() => navigation.goBack()}
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

            <View
                style={{
                    position:"absolute",
                    bottom:0,
                    zIndex:999,
                    backgroundColor:COLORS.transparentPrimray,
                    borderTopWidth:3,
                    borderColor:'#ffffff80'
                }}
            >
                <FlatList
                    data={properties}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <VerticalCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == properties.length - 1 ? SIZES.padding : 0,
                                padding: 18,
                                marginVertical:SIZES.padding,
                                ...BOXSHADOW,
                            }}
                            imageStyle={{
                                margin: 10,
                                borderRadius:SIZES.radius,
                                height: 150,
                                width: 150,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            item={item}
                            onPress={() => navigation.navigate( "PropertyDetail", { item: item } ) }
                        />
                    )}
                />
            </View>

            <MapView
                mapType="standard"
                initialRegion={region}
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
                {properties &&
                    properties.map(marker => (
                        <Marker
                            key={`Marker-${marker.id}`}
                            coordinate={{latitude:parseFloat(marker?.latitude),longitude:parseFloat(marker?.longitude)}}
                            title={marker.title}
                            description={marker?.address}
                        >
                            <Image source={icons.locationPin} style={{height: 35, width:35, tintColor:COLORS.primary }} />
                        </Marker>
                    ))
                }

            </MapView>

        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
