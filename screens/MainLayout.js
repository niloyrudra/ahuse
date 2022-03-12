import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient'

import useAxios from 'axios-hooks';
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux'
import { setSelectedTab } from '../store/tab/tabActions';
import { getAllProperties, getAllCats, getAllTypes, getRecommendedProp, getPopularProp } from '../store/property/propertyActions';

// Component
import Header from '../components/Header';
import TabButton from '../components/TabButton';

// Screens
// Home
import Home from "../screens/Home/Home"
// Search
import Search from "../screens/Search/Search";
// Add Property
import AddProperty from '../screens/Property/AddProperty';
// Favourite
import Favourite from "../screens/Favourite/Favourite";
// Notification
import Notification from "../screens/Notification/Notification"

// Constants
import constants from '../constants/constants';
import icons from '../constants/icons';
import images from '../constants/images';
import { COLORS ,SIZES } from '../constants/theme';
import Profile from './User/Profile';

const MainLayout = ( {navigation, selectedTab, selectedCats, selectedProperties, setSelectedTab, setAllProperties, setAllCats, setPopularList, setRecommendedList } ) => {

    const [ properties, setProperties ] = React.useState(selectedProperties)
    const [ categories, setCategories ] = React.useState([])
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)

    // AXIOS CALLING
    const [{ data, loading, error, response }, refetch] = useAxios(
        `${constants.ROOT_URL}/ahuse/api/v1/cat`,
        {
            manual: false, // if TRUE, it will not execute immediately
            useCache: true,
            autoCancel: true
        }
    );

    React.useEffect(() => {
        if( !error && data) {
            setAllCats( data )
            setCategories( data )
        }
        else{
            refetch()
        }
    },[data]);

    React.useEffect(() => {
        if( selectedProperties){
            // Retrieve the recommended properties
            let popular = selectedProperties.filter( item => item.recommend == 1 )
            // Set the featured properties as recommended properties
            setPopularList( popular );
            // Retrieve the recommended properties
            let recommends = selectedProperties.filter( item => item.recommend == 1 )
            // Set the featured properties as recommended properties
            setRecommendedList( recommends );

            setProperties( selectedProperties )
        }
        // return () => setAllProperties([])
    },[selectedProperties])

    const progress = useDrawerProgress()

    const flatListRef = React.useRef()

    // ReAnimated InterPlateNode Properties
    const scale = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [1, 0.8]
    } )

    const borderRadius = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [0, 26]
    } )

    const animatedStyle = { borderRadius, transform: [{scale}] }

    // ReAnimated Shared Value
    const homeTabFlex = useSharedValue(1)
    const homeTabColor = useSharedValue( COLORS.white )
    
    const searchTabFlex = useSharedValue(1)
    const searchTabColor = useSharedValue( COLORS.white )

    const addPropTabFlex = useSharedValue(1)
    const addPropTabColor = useSharedValue( COLORS.white )

    const favouriteTabFlex = useSharedValue(1)
    const favouriteTabColor = useSharedValue( COLORS.white )

    const notificationTabFlex = useSharedValue(1)
    const notificationTabColor = useSharedValue( COLORS.white )

    const profileTabFlex = useSharedValue(1)
    const profileTabColor = useSharedValue( COLORS.white )

    const selectedToken = useSelector( state => state.userReducer.token )

    React.useEffect(() => {
        // let controller = new AbortController();
        let isMounted = true;
        console.log(selectedToken)
        if(isMounted){
            if(selectedToken) {
                setIsLoggedIn(true)
            }
        }
        return () => {
            isMounted= false;
            setIsLoggedIn(false)
        }
    }, [selectedToken])

    // ReAnimated Animated Style
    const homeFlexStyle = useAnimatedStyle( () => {
        return {
            flex: homeTabFlex.value
        }
    } )
    const homeColorStyle = useAnimatedStyle( () => {
        return {
            backgroundColor: homeTabColor.value
        }
    } )
    
    const searchFlexStyle = useAnimatedStyle( () => {
        return {
            flex: searchTabFlex.value
        }
    } )
    const searchColorStyle = useAnimatedStyle( () => {
        return {
            backgroundColor: searchTabColor.value
        }
    } )

    const addPropFlexStyle = useAnimatedStyle( () => {
        return {
            flex: addPropTabFlex.value
        }
    } )
    const addPropColorStyle = useAnimatedStyle( () => {
        return {
            backgroundColor: addPropTabColor.value
        }
    } )

    const favouriteFlexStyle = useAnimatedStyle( () => {
        return {
            flex: favouriteTabFlex.value
        }
    } )
    const favouriteColorStyle = useAnimatedStyle( () => {
        return {
            backgroundColor: favouriteTabColor.value
        }
    } )

    const notificationFlexStyle = useAnimatedStyle( () => {
        return {
            flex: notificationTabFlex.value
        }
    } )
    const notificationColorStyle = useAnimatedStyle( () => {
        return {
            backgroundColor: notificationTabColor.value
        }
    } )

    const profileFlexStyle = useAnimatedStyle( () => {
        return {
            flex: profileTabFlex.value
        }
    } )
    const profileColorStyle = useAnimatedStyle( () => {
        return {
            backgroundColor: profileTabColor.value
        }
    } )

    React.useEffect(() => {

        let mounted1 = true;
        let mounted = true;
        (async() => {
            const currentTime = Date.now(); // Get the current time in milliseconds
            try {
                const tokenExpIn = await AsyncStorage.getItem( "TokenExpIn" )
                const startSession = await AsyncStorage.getItem( "startSession" )
                if(mounted1){

                    if( currentTime && tokenExpIn && startSession ) {
                        console.log('Session Detail >> ', currentTime, startSession, tokenExpIn)
                        if( currentTime > ( parseInt( tokenExpIn ) + parseInt( startSession ) ) ) {
                            await AsyncStorage.removeItem("token", (err) => console.log('token_err', err) );
                            await AsyncStorage.removeItem("tempToken", (err) => console.log('tempToken_err', err) );
                            await AsyncStorage.removeItem("TokenExpIn", (err) => console.log('TokenExpIn_err', err) );
                            await AsyncStorage.removeItem("startSession", (err) => console.log('startSession_err', err) );
                            await AsyncStorage.removeItem("email", (err) => console.log('email_err', err) );
                            await AsyncStorage.removeItem("username", (err) => console.log('username_err', err) );
                            await AsyncStorage.removeItem("displayName", (err) => console.log('displayName_err', err) );
                            await AsyncStorage.removeItem("userId", (err) => console.log('userId_err', err) );
                            await AsyncStorage.removeItem("role", (err) => console.log('role_err', err) );
                            await AsyncStorage.removeItem(`favProps`, (err) => console.log('favProps_err', err) );
                            await AsyncStorage.clear();
                        }
                        else{
                            console.log( "Still have time to expire the token!" )
                        }
                    }
                }

            }
            catch(err) {
                console.log(err)
            }
        })()

        setSelectedTab( constants.screens.home )
        if(!isLoggedIn) {
            (async () => {
                try{
                    const token = await AsyncStorage.getItem('token')
                    const userId = await AsyncStorage.getItem('userId')
                    console.log("[MAIN_LAYOUT]")
                    if(token || userId){
                        // console.log(token)
                        if( mounted ) setIsLoggedIn(true)
                    }
                    else{
                        if( mounted ) setIsLoggedIn(false)
                    }
                }
                catch(err){
                    setIsLoggedIn(false)
                }
            })()
        }
        return () => {
            mounted1 = false
            mounted = false
        }
    }, [])


    React.useEffect(() => {
        if(selectedTab == constants.screens.home)
        {
            flatListRef?.current?.scrollToIndex({
                index:0,
                animated:false
            })
            // homeTabFlex.value = withTiming(4, { duration: 500 })
            homeTabFlex.value = withTiming(1, { duration: 500 })
            homeTabColor.value = withTiming( COLORS.primary, { duration: 500 } )
        }else {
            homeTabFlex.value = withTiming(1, { duration: 500 })
            homeTabColor.value = withTiming( COLORS.white, { duration: 500 } )
        }

        if(selectedTab == constants.screens.search)
        {
            flatListRef?.current?.scrollToIndex({
                index:1,
                animated:false
            })
            searchTabFlex.value = withTiming(1, { duration: 500 })
            searchTabColor.value = withTiming( COLORS.primary, { duration: 500 } )
        }else {
            searchTabFlex.value = withTiming(1, { duration: 500 })
            searchTabColor.value = withTiming( COLORS.white, { duration: 500 } )
        }

        if(selectedTab == constants.screens.addProp)
        {
            flatListRef?.current?.scrollToIndex({
                // index:3,
                index:2,
                animated:false
            })
            addPropTabFlex.value = withTiming(1, { duration: 500 })
            addPropTabColor.value = withTiming( COLORS.primary, { duration: 500 } )
        }else {
            addPropTabFlex.value = withTiming(1, { duration: 500 })
            addPropTabColor.value = withTiming( COLORS.white, { duration: 500 } )
        }

        if(selectedTab == constants.screens.favourite)
        {
            flatListRef?.current?.scrollToIndex({
                // index:4,
                index:3,
                animated:false
            })
            favouriteTabFlex.value = withTiming(1, { duration: 500 })
            favouriteTabColor.value = withTiming( COLORS.primary, { duration: 500 } )
        }else {
            favouriteTabFlex.value = withTiming(1, { duration: 500 })
            favouriteTabColor.value = withTiming( COLORS.white, { duration: 500 } )
        }

        if(selectedTab == constants.screens.notification)
        {
            flatListRef?.current?.scrollToIndex({
                // index:5,
                index:4,
                animated:false
            })
            notificationTabFlex.value = withTiming(1, { duration: 500 })
            notificationTabColor.value = withTiming( COLORS.primary, { duration: 500 } )
        }else {
            notificationTabFlex.value = withTiming(1, { duration: 500 })
            notificationTabColor.value = withTiming( COLORS.white, { duration: 500 } )
        }

        if(selectedTab == constants.screens.profile)
        {
            flatListRef?.current?.scrollToIndex({
                index:5,
                animated:false
            })
            profileTabFlex.value = withTiming(1, { duration: 500 })
            profileTabColor.value = withTiming( COLORS.primary, { duration: 500 } )
        }else {
            profileTabFlex.value = withTiming(1, { duration: 500 })
            profileTabColor.value = withTiming( COLORS.white, { duration: 500 } )
        }
        
    }, [selectedTab]);

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
                title={selectedTab == 'Home' ? 
                    <View
                        style={{
                            flex:1,
                            justifyContent:"center",
                            alignItems:"center",
                            height:50
                        }}
                    >
                        <Image
                            source={images.logo_01}
                            resizeMode='contain'
                            style={{
                                height:'100%',
                                tintColor:COLORS.primary,
                                justifyContent:"flex-end"
                            }}
                        />
                    </View>
                 : selectedTab?.toUpperCase()
                }
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
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={icons.menu}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <View style={{flex:0}} />
                }
            />


            <View
                style={{
                    flex:1
                }}
            >
                <FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}
                    data={constants.bottom_tabs}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={( { item, idex } ) => {
                        return(
                            <View
                                style={{
                                    height:SIZES.height,
                                    width: SIZES.width
                                }}
                            >
                                {item.label == constants.screens.home && <Home navigation={navigation} allProperties={properties} setSelectedTab={setSelectedTab} categories={categories} />}
                                {item.label == constants.screens.search && <Search navigation={navigation} setSelectedTab={setSelectedTab} />}
                                {item.label == constants.screens.addProp && <AddProperty navigation={navigation} setSelectedTab={setSelectedTab} />}
                                {item.label == constants.screens.favourite && <Favourite navigation={navigation} setSelectedTab={setSelectedTab} />}
                                {item.label == constants.screens.notification && <Notification navigation={navigation} setSelectedTab={setSelectedTab} />}
                                {item.label == constants.screens.profile && <Profile navigation={navigation} setSelectedTab={setSelectedTab} onSwitch={() => setSelectedTab( constants.screens.addProp )} />}

                            </View>
                        )
                    }}
                ></FlatList>
            </View>


            <View
                style={{
                    height:100,
                    justifyContent: "flex-end",
                    position:"relative"
                }}
            >
                <LinearGradient
                    start={{ x:0, y:0 }}
                    end={{ x:0, y:4 }}
                    colors={ [
                        COLORS.transparent,
                        COLORS.lightGray1
                    ] }
                    style={{
                        position:"absolute",
                        left:0,
                        right:0,
                        top:-20,
                        height:20,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    }}
                />

                <View
                    style={{
                        flex:1,
                        flexDirection: "row",
                        paddingHorizontal: SIZES.radius,
                        paddingBottom:5,
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                    }}
                >

                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        outerContainerStyles={homeFlexStyle}
                        innerContainerStyles={homeColorStyle}
                        onPress={() => setSelectedTab( constants.screens.home )}
                    />

                    <TabButton
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab == constants.screens.search}
                        outerContainerStyles={searchFlexStyle}
                        innerContainerStyles={searchColorStyle}
                        onPress={() => setSelectedTab( constants.screens.search )}
                    />

                    <TabButton
                        label={constants.screens.addProp}
                        icon={icons.plus}
                        isFocused={selectedTab == constants.screens.addProp}
                        outerContainerStyles={addPropFlexStyle}
                        innerContainerStyles={addPropColorStyle}
                        onPress={() => setSelectedTab( constants.screens.addProp )}
                    />

                    <TabButton
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        outerContainerStyles={favouriteFlexStyle}
                        innerContainerStyles={favouriteColorStyle}
                        onPress={() => setSelectedTab( constants.screens.favourite )}
                    />

                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        outerContainerStyles={notificationFlexStyle}
                        innerContainerStyles={notificationColorStyle}
                        onPress={() => setSelectedTab( constants.screens.notification )}
                    />

                    {
                        isLoggedIn &&
                            <TabButton
                                label={constants.screens.profile}
                                icon={icons.userSetting}
                                isFocused={selectedTab == constants.screens.profile}
                                outerContainerStyles={profileFlexStyle}
                                innerContainerStyles={profileColorStyle}
                                onPress={() => setSelectedTab( constants.screens.profile )}
                            />
                    }
                </View>

            </View>

        </Animated.View>
    )
}

function mapStateToProps( state ) {

    return {
        selectedTab: state?.tabReducer?.selectedTab?.tabPayload,
        selectedProperties: state?.propertyReducer?.allProperties,
        selectedCats: state?.propertyReducer?.allCategories,
        selectedPopular: state?.propertyReducer?.popular,
        selectedRecommended: state?.propertyReducer?.recommended,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setSelectedTab: selectedTab => dispatch( setSelectedTab(selectedTab) ),
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
        setAllCats: selectedCats => dispatch( getAllCats( selectedCats ) ),
        setPopularList: selectedPopular => dispatch( getPopularProp( selectedPopular ) ),
        setRecommendedList: selectedRecommended => dispatch( getRecommendedProp( selectedRecommended ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( MainLayout )