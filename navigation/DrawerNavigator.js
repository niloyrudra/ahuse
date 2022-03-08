import React from 'react'
import { Text, View, TouchableOpacity, Image} from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import { MainLayout } from '../screens'

// Constants
import constants from '../constants/constants'
import icons from '../constants/icons'
import images from '../constants/images'
import {COLORS, FONTS, SIZES} from '../constants/theme'
// Components
import CustomDrawerItem from '../components/CustomDrawerItem'

// Components
import PropertyDetail from '../screens/Property/PropertyDetail'
import Cart from '../screens/Cart/Cart'
import Checkout from '../screens/Checkout/Checkout'
import MyCards from '../screens/Cards/MyCards'
import AddNewCard from '../screens/Cards/AddNewCard'
import Success from '../screens/Checkout/Success'
import MapScreen from '../screens/Map/MapScreen'
import SingleMapScreen from '../screens/Map/SingleMapScreen';
///
// Redux
import { connect } from 'react-redux'
import { setSelectedTab } from '../store/tab/tabActions'
import { useDispatch } from 'react-redux'
import { userSignOutAction } from '../store/user/userActions'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {

    const dispatch = useDispatch();
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)


    React.useEffect(() => {
        let mounted = true;
            (async () => {
                try{
                    const token = await AsyncStorage.getItem('token')
                    const userId = await AsyncStorage.getItem('userId')
                    console.log("DRAWER_NAV",userId,token)
                    if(token || userId){
                        // console.log(token)
                        if( mounted ) setIsLoggedIn(true)
                    }
                    else{
                        // console.log(token)
                        if( mounted ) setIsLoggedIn(false)
                    }
                }
                catch(err){
                    setIsLoggedIn(false)
                }
            })()
        
        return () => {
            mounted = false
        }
    }, [])
    
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{flex:1}}
        >
            {/* Drawer Body */}
            <View
                style={{
                    flex:1,
                    paddingHorizontal: SIZES.radius,
                }}
            >
                {/* Close */}
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

                {/* Profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                        alignItems: "center"
                    }}
                    onPress={() => console.log("profile")}
                >
                    <Image
                        source={images.profile}
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                    style={{marginLeft: SIZES.radius}}>
                        <Text style={{color: COLORS.white, ...FONTS.h3 }}
                        >Ahuse</Text>
                        <Text style={{color:COLORS.white, ...FONTS.body4}}>View your profile</Text>
                    </View>
                </TouchableOpacity>

                {/* Drawer Items */}
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

                     {/* Line Divider */}
                     <View
                        style={{
                            height:1,
                            marginVertical: SIZES.radius,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray1
                        }}
                    />

                    {/* Coupon */}
                    <CustomDrawerItem
                        label="Coupon"
                        icon={icons.coupon}
                        onPress={() => navigation.navigate("Settings")}
                    />
                    {/* Settings */}
                    <CustomDrawerItem
                        label="Settings"
                        icon={icons.setting}
                        onPress={() => navigation.navigate("Settings")}
                    />
                    {/* Invite friends */}
                    <CustomDrawerItem
                        label="Invite a friend"
                        icon={icons.profile}
                        // onPress={() => navigation.navigate("Settings")}
                    />
                    {/* Help Center */}
                    <CustomDrawerItem
                        label="Help Center"
                        icon={icons.help}
                        // onPress={() => navigation.navigate("Settings")}
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
                                dispatch( userSignOutAction() )
                                setIsLoggedIn(false)
                                navigation.closeDrawer()
                                console.log("logged out")
                                // navigation.navigate("SignIn")
                            }}
                        />
                        :
                        <CustomDrawerItem
                            label="Sign In"
                            icon={icons.login}
                            onPress={() => {
                                navigation.closeDrawer()
                                navigation.navigate("SignIn")
                            }}
                        />
                    }
                </View>

            </View>

        </DrawerContentScrollView>

    )
}

const DrawerNavigator = ( { selectedTab, setSelectedTab } ) => {

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
                
                <Drawer.Screen name="Cart">
                    {(props) => <Cart {...props} />}
                </Drawer.Screen>

                <Drawer.Screen name="MyCards">
                    {(props) => <MyCards {...props} />}
                </Drawer.Screen>

                <Drawer.Screen name="AddCard">
                    {(props) => <AddNewCard {...props} />}
                </Drawer.Screen>
                                
                <Drawer.Screen name="Checkout">
                    {(props) => <Checkout {...props} />}
                </Drawer.Screen>
                                
                <Drawer.Screen name="Success">
                    {(props) => <Success {...props} options={{
                        gestureEnabled:false
                    }} />}
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

// export default DrawerNavigator

function mapStateToProps( state ) {
    // console.log(state.userReducer)
    return {
        selectedTab: state?.tabReducer?.selectedTab?.tabPayload
    }
}

function mapDispatchToProps( dispatch ) {
     return {
         setSelectedTab: selectedTab => dispatch( setSelectedTab(selectedTab) )
     }
}

export default connect( mapStateToProps, mapDispatchToProps )( DrawerNavigator )