import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, Platform, FlatList, Alert, Clipboard } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import * as MailComposer from 'expo-mail-composer';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux'

// Components
import Header from '../../components/Header';
import LineDivider from '../../components/LineDivider';
import TextButton from '../../components/TextButton';
import TextIconButton from '../../components/TextIconButton';

// Constants
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import constants from '../../constants/constants';
import icons from '../../constants/icons'
import utils from '../../utils/Utils';

import { updateFavPropertyList } from '../../store/property/propertyActions';

const PropertyDetail = ({navigation, route}) => {

    const property = route.params.item
    const dispatch = useDispatch();

    const [ email, setEmail ] = React.useState('')
    const [ userId, setUserId ] = React.useState(null)
    const [ isFav, setIsFav ] = React.useState(property?.is_fav)
    // const [ favProps, setFavProps ] = React.useState([])

    const progress = useDrawerProgress()
    const scale = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [1, 0.8]
    } )
    const borderRadius = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [0, 26]
    } )
    const animatedStyle = { borderRadius, transform: [{scale}] }

    React.useEffect(() => {
        let mounted = true;
        // console.log(property)
        (async () => {
            try{
                const userId = await AsyncStorage.getItem("userId")
                const email = await AsyncStorage.getItem("email")
                // const favPropList = await getFavPropList()
                if(mounted) {
                    if(userId) setUserId(userId)
                    if(email) setEmail(email)
                    // if(favPropList) setFavProps(favPropList)
                }
            }
            catch(err){
                console.log("Profile data Async Error", err)
                setUserId(null)
                setEmail('')
            }
        })();
        return () => mounted = false;
    }, [])

    // Handler
    const sendFeedback = () => {
        MailComposer.composeAsync({
          recipients: [property.publisher_email],
          subject: "",
          body: ""
        }).catch(() =>
          Alert.alert("Unable To Send Feedback", undefined, [
            {
              text: "Copy feedback email",
              onPress: () => Clipboard.setString(property.publisher_email)
            },
            {
              text: "OK"
            }
          ])
        );
      };

    // Render Sections
    const renderDetail= () => {
        return (
            <View
                style={{
                    marginTop:SIZES.radius,
                    marginBottom:SIZES.padding,
                    paddingHorizontal:SIZES.padding
                }}
            >
                <View
                    style={{
                        height: 190,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray2
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            marginTop:SIZES.base,
                            paddingHorizontal:SIZES.radius
                        }}
                    >
                        <View
                            style={{
                                flex:1,
                            }}
                        >
                            {renderCategories()}
                        </View>

                        <Image
                            source={icons.love}
                            style={{
                                width:20,
                                height:20,
                                tintColor: ( isFav || property.is_fav ) ? COLORS.primary : COLORS.gray
                            }}
                        />

                    </View>

                    <View
                        style={{
                            flex:1,
                            padding:SIZES.base,
                            overflow:"hidden",
                        }}
                    >

                        <Image
                            source={{uri:property.thumbnail}}
                            resizeMode='cover'
                            style={{
                                height:'100%',
                                width:'100%',
                            borderRadius:SIZES.radius
                            }}
                        />
                    </View>

                </View>

                <View
                    style={{
                        marginTop:SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h1
                        }}
                    >
                        { property?.title }
                    </Text>
                    <View
                        style={{
                            flexDirection:"row",
                        }}
                    >
                        <Image
                            source={icons.locationPin}
                            style={{
                                width:16,
                                height:16,
                                tintColor:COLORS.gray2,
                                marginRight:SIZES.base
                            }}
                        />
                        <Text
                            style={{
                                color:COLORS.gray,
                                ...FONTS.body4
                            }}
                        >
                            { property?.address }
                        </Text>
                    </View>

                    {renderTypes()}

                    <Text
                        style={{
                            marginTop:SIZES.base,
                            color:COLORS.darkGray,
                            textAlign: 'justify',
                            ...FONTS.body3
                        }}
                    >
                        { property?.content }
                    </Text>

                </View>

            </View>
        )
    };

    const renderCategories = () => {
        return (
            <View
                style={{
                    flex:1
                }}
            >
                {  property.cat_names && property.cat_names.length &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                        }}
                    >
                        <Image
                            source={icons.category}
                            style={{
                                width:20,
                                height:20,
                                tintColor: COLORS.gray
                            }}
                        />

                        {
                            property?.cat_names.map( (item, index) => (
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        paddingHorizontal: SIZES.base,
                                        borderLeftWidth: index > 0 ? 1 : 0,
                                        borderLeftColor: COLORS.gray,
                                        color:COLORS.gray
                                    }}
                                    key={`${item}`}
                                >{item}</Text>
                            ) )
                        }

                    </View>
                }
            </View>
        )
    }

    const renderTypes = () => {
        return (
            <View
                style={{
                    flex:1,
                    marginVertical: SIZES.base
                }}
            >
                { property.cad_names && property.cad_names.length &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            marginTop: 10
                        }}
                    >
                        <Image
                            source={icons.houseMenu}
                            style={{
                                width:20,
                                height:20,
                                tintColor: COLORS.primary
                            }}
                        />

                        {
                            property.cad_names.map( (item, index) => (
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        paddingHorizontal: SIZES.base,
                                        borderLeftWidth: index > 0 ? 1 : 0,
                                        borderLeftColor: COLORS.gray3
                                    }}
                                    key={`${item}`}
                                >{item}</Text>
                            ) )
                        }

                    </View>
                }
            </View>
        )
    }

    const renderMap = () => {
        return (
            <TouchableOpacity 
                style={{
                    flex:1,
                    height: 300,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.transparentBlack1,
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    backgroundColor:COLORS.gray2,
                    overflow:"hidden"
                }}
                onPress={() => navigation.navigate("SingleMap", {item: property})}
            >
                {
                    constants.GOOGLE_MAP_API_KEY !== '' && property.latitude !== '' && property.latitude !== '' ?

                    <Image
                        source={{uri:`https://maps.googleapis.com/maps/api/staticmap?center=${property.latitude},${property.longitude}&zoom=13&size=600x300&maptype=standard&markers=color:${COLORS.primaryText}%7Clabel:S%7C${property.latitude},${property.longitude}&key=${constants.GOOGLE_MAP_API_KEY}`}}
                        style={{
                            flex:1,
                            width:'100%',
                            backgroundColor:COLORS.lightGray
                        }}
                    />
                    :
                    <Text>No map data found!</Text>
                }

            </TouchableOpacity>
        )
    }

    const renderRoomsQuantity = () => {
        return (
            <View
                style={{
                    flex:1,
                    flexDirection:"row",
                    alignItems:'flex-end',
                    justifyContent:'space-around',
                    marginTop:SIZES.radius,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {
                    property?.rooms &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                        }}
                    >
                        <Image
                            source={icons.room}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.primary,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.rooms} <Text style={{...FONTS.body5}}>room(s)</Text></Text>
                    </View>
                }
                {
                    property?.bedrooms &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                            paddingHorizontal: SIZES.radius,
                            borderLeftWidth:1,
                            borderRightWidth:1,
                            borderColor:COLORS.gray3
                        }}
                    >
                        <Image
                            source={icons.bedroom}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.primary,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.bedrooms} <Text style={{...FONTS.body5}}>bedroom(s)</Text></Text>
                    </View>
                }
                {
                    property?.bathrooms &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                            marginRight:SIZES.padding
                        }}
                    >
                        <Image
                            source={icons.bathroom}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.primary,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.bathrooms} <Text style={{...FONTS.body5}}>bathroom(s)</Text></Text>
                    </View>
                }

            </View>
        )
    }

    const renderSectionHeader = ( label ) => {
        return (
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20,
                    marginTop: SIZES.radius,
                }}
            >
                <Text
                    style={{
                        flex:1,
                        ...FONTS.h2
                    }}
                >
                    {label}
                </Text>

                <Text
                    style={{
                        color:COLORS.gray2,
                        ...FONTS.body4
                    }}
                >
                    {property?.features?.length} item(s)
                </Text>

            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    flexDirection:"row",
                    height:100, // 120
                    alignItems:"center",
                    paddingHorizontal:SIZES.padding,
                    paddingBottom:SIZES.radius
                }}
            >
                <TextIconButton
                    label="E-mail"
                    icon={icons.envelope}
                    iconPosition="right"
                    containerStyle={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center",
                        height:60,
                        marginLeft:SIZES.radius,
                        paddingHorizontal:SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.darkGray
                    }}
                    iconStyle={{
                        tintColor:COLORS.white,
                        marginLeft:SIZES.radius
                    }}
                    onPress={sendFeedback}
                />

                <TextButton
                    label=""
                    label2={property?.price ? `Price: ${constants.currency}${utils.thousandSeparator(property?.price)}` : `Price:  ${constants.currency}00.00`}
                    labelStyle={{
                        color:COLORS.primary,
                        ...FONTS.h1,
                    }}
                    label2Style={{
                        color:COLORS.primary,
                        ...FONTS.h1
                    }}
                    buttonContainerStyle={{
                        flex:1,
                        flexDirection:"row",
                        height:60,
                        marginLeft:SIZES.radius,
                        backgroundColor:COLORS.transparent,
                        border:"none"
                    }}
                />

            </View>
        )
    }

    // Handler
    const setFavPropList = async () => {
        if( userId ) {
            console.log("triggered")
            setIsFav(!isFav);
            dispatch( updateFavPropertyList( property.id ) )
        }
    }

    const setFavPropHandler = async () => {
        if( !userId ) {
            Alert.alert(
                "Sorry!",
                "You need to log in to like this property!",
                [
                    {
                        text: "Login",
                        onPress: navigation.navigate("Auth"),
                        style: "Ok"
                    },
                    {
                        text: "Cancel",
                        onPress: console.log("Cancelled"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }
        setFavPropList();
    }

    return (
        <Animated.View
            style={{
                flex: 1,
                 backgroundColor: COLORS.white,
                 ...animatedStyle
            }}
        >
            <Header
                containerStyle={{
                    height:50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}
                title='DETAIL'
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            height:40,
                            justifyContent:"center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
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
                }
                rightComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            height:40,
                            justifyContent:"center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
                        }}
                        onPress={setFavPropHandler}
                    >
                        <Image
                            source={icons.love}
                            style={{
                                width:20,
                                height:20,
                                tintColor: ( isFav || property.is_fav ) ? COLORS.primary : COLORS.gray
                            }}
                        />
                    </TouchableOpacity>
                }
            />

            <ScrollView>

                {renderDetail()}

                <LineDivider/>

                {renderRoomsQuantity()}

                {renderMap()}

                {renderSectionHeader("Features")}

                <View
                    style={{
                        flex:1,
                        paddingHorizontal: SIZES.padding,
                        marginBottom:SIZES.padding
                    }}
                >
                    {
                        property.features && property.features.map( (item, index) => (
                            <View
                                style={{
                                    flexDirection:"row",
                                    marginVertical: 5,
                                    justifyContent:"space-between",
                                    alignItems:'center',
                                    height:35
                                }}
                                key={`${index}`}
                            >
                                <View
                                    style={{
                                        flex:1,
                                        justifyContent:"center"
                                    }}
                                >
                                    <Text style={{ ...FONTS.body4, color:COLORS.gray }}>{item.toUpperCase()}</Text>
                                </View>

                                <Image
                                    source={icons.correct}
                                    style={{
                                        width:20,
                                        height:20,
                                        tintColor: COLORS.primary
                                    }}
                                />
                            </View>
                        ) )
                    }
                </View>

            </ScrollView>
            <LineDivider/>
            
            {renderFooter()}

        </Animated.View>
    );
}

export default PropertyDetail