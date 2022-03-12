import React from 'react'
import { Text, View, TouchableOpacity, Image} from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens

// Constants
import constants from '../constants/constants'
import icons from '../constants/icons'
import images from '../constants/images'
import {COLORS, FONTS, SIZES} from '../constants/theme'

// Components
import MainLayout from '../screens/MainLayout'
import CustomDrawerItem from '../components/CustomDrawerItem'
import PropertyDetail from '../screens/Property/PropertyDetail'
import MapScreen from '../screens/Map/MapScreen'
import SingleMapScreen from '../screens/Map/SingleMapScreen';
///
// Redux
import { connect } from 'react-redux'
import { setSelectedTab } from '../store/tab/tabActions'
import { useDispatch } from 'react-redux'
import { userSignOutAction } from '../store/user/userActions'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab, selectedToken }) => {
    
    const dispatch = useDispatch()
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)
    const [ username, setUserName ] = React.useState('')

    React.useEffect(() => {
        let mounted = true;
        (async () => {
            if( mounted ) {
                // const token = await AsyncStorage.getItem("token")
                const userName = await AsyncStorage.getItem("username");
                if( userName ) {
                    setIsLoggedIn(true);
                    setUserName( JSON.parse(userName) );
                }
                else {
                    setUserName('');
                    setIsLoggedIn(false);
                }
            }
        })()
        return () => {
            mounted = false;
            setUserName('');
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{flex:1}}
        >
            <View
                style={{
                    flex:1,
                    paddingHorizontal: SIZES.radius,
                }}
            >
                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection:"row",
                            marginTop: SIZES.radius,
                            alignItems:"center",
                        }}
                        onPress={() => navigation.closeDrawer() }
                    >
                        <Image
                            source={icons.cross}
                            style={{
                                height: 35,
                                width: 35,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                        alignItems: "center"
                    }}
                    onPress={() => {
                        if(!username) return
                        setSelectedTab( constants.screens.profile )
                        navigation.navigate("MainLayout")
                    }}
                >
                {
                    username && isLoggedIn ?
                    <>
                        <Image
                            source={images.profile}
                            resizeMode="contain"
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: SIZES.radius
                            }}
                        />
                        <View
                        style={{marginLeft: SIZES.radius}}>
                            <Text style={{color: COLORS.white, ...FONTS.h3 }}
                            >{username}</Text>
                            <Text style={{color:COLORS.white, ...FONTS.body4}}>View your profile</Text>
                        </View>
                    </>
                    :
                    <>
                        <Image
                            source={images.logo_01}
                            resizeMode="contain"
                            style={{
                                height: 50,
                                width: 80,
                                borderRadius: SIZES.radius
                            }}
                        />
                        <View
                        style={{marginLeft: SIZES.radius}}>
                            <Text style={{color: COLORS.white, ...FONTS.h3 }}
                            >Ahuse</Text>
                            <Text style={{color:COLORS.white, ...FONTS.body4}}>View your profile</Text>
                        </View>
                    </>
                }
                </TouchableOpacity>

                <View
                    style={{
                        flex:1,
                        marginTop: SIZES.padding
                    }}
                >
                    <CustomDrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        onPress={() => {
                            setSelectedTab( constants.screens.home )
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab == constants.screens.search}
                        onPress={() => {
                            setSelectedTab( constants.screens.search )
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.addProp}
                        icon={icons.plus}
                        isFocused={selectedTab == constants.screens.addProp}
                        onPress={() => {
                            setSelectedTab( constants.screens.addProp )
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        onPress={() => {
                            setSelectedTab( constants.screens.favourite )
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => {
                            setSelectedTab( constants.screens.notification )
                            navigation.navigate("MainLayout")
                        }}
                    />

                     <View
                        style={{
                            height:1,
                            marginVertical: SIZES.radius,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray1
                        }}
                    />

                    <CustomDrawerItem
                        label="Coupon"
                        icon={icons.coupon}
                        onPress={() => console.log("Settings")}
                    />
                    {/* Settings */}
                    <CustomDrawerItem
                        label="Settings"
                        icon={icons.setting}
                        onPress={() => console.log("Settings")}
                    />
                    {/* Invite friends */}
                    <CustomDrawerItem
                        label="Invite a friend"
                        icon={icons.profile}
                        onPress={() => console.log("Settings")}
                    />
                    {/* Help Center */}
                    <CustomDrawerItem
                        label="Help Center"
                        icon={icons.help}
                        onPress={() => console.log("Settings")}
                    />

                </View>

                {/* Footer */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    {/* Logout/SignIn */}
                    { isLoggedIn ?
                        <CustomDrawerItem
                            label="Logout"
                            icon={icons.logout}
                            onPress={() => {
                                setIsLoggedIn(false)
                                setUserName('')
                                dispatch( userSignOutAction() )
                                navigation.closeDrawer()
                                console.log("logged out")
                                navigation.navigate("Home")
                                // setSelectedTab( constants.screens.home )
                                // navigation.navigate("MainLayout")
                            }}
                        />
                        :
                        <CustomDrawerItem
                            label="Sign In"
                            icon={icons.login}
                            onPress={() => {
                                navigation.closeDrawer()
                                navigation.navigate("Auth")
                            }}
                        />
                    }
                </View>

            </View>

        </DrawerContentScrollView>

    )
}

const DrawerNavigator = ( { navigation, route, selectedTab, setSelectedTab, selectedToken } ) => {

    // const  [ isLoggedIn, setIsLoggedIn ] = React.useState(true)

    // React.useEffect( () => {
    //     let mounted = true;
    //     console.log("route.....", route)
    //     if( route?.params?.isLoggedIn ) {
    //         if( mounted ) setIsLoggedIn( true )
    //     }
    //     return () => {
    //         mounted = false;
    //         setIsLoggedIn( false )
    //     }
    // }, [] );

    return (
        <View
            style={{
                flex:1,
                backgroundColor: COLORS.primary
            }}
        >
            <Drawer.Navigator
                screenOptions={{
                    headerShown:false,
                    drawerType:"slide",
                    drawerStyle: {
                        backgroundColor: 'transparent',
                        flex:1,
                        width: '65%',
                        paddingRight: 20,
                    },
                    overlayColor: "transparent",
                    sceneContainerStyle:{
                        backgroundColor: "transparent"
                    }
                }}
                initialRouteName="MainLayout"
                drawerContent={(props) => {
                    return(
                        <CustomDrawerContent
                            {...props}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            selectedToken={selectedToken}
                        />
                    )
                }}
            >
                <Drawer.Screen name="MainLayout">
                    {(props) => <MainLayout {...props} />}
                </Drawer.Screen>
                
                <Drawer.Screen name="PropertyDetail">
                    {(props) => <PropertyDetail {...props} />}
                </Drawer.Screen>
                                                
                <Drawer.Screen name="MapScreen">
                    {(props) => <MapScreen {...props} options={{
                        gestureEnabled:false
                    }} />}
                </Drawer.Screen>
                <Drawer.Screen name="SingleMap">
                    {(props) => <SingleMapScreen {...props} options={{
                        gestureEnabled:false
                    }} />}
                </Drawer.Screen>

            </Drawer.Navigator>
        </View>
    )
}

function mapStateToProps( state ) {
    return {
        selectedTab: state?.tabReducer?.selectedTab?.tabPayload,
        selectedToken: state?.userReducer?.token,
    }
}

function mapDispatchToProps( dispatch ) {
     return {
         setSelectedTab: selectedTab => dispatch( setSelectedTab(selectedTab) )
        //  setSelectedTab: selectedTab => dispatch( setSelectedTab(selectedTab) )
     }
}

export default connect( mapStateToProps, mapDispatchToProps )( DrawerNavigator )