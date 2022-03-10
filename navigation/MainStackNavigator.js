import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import constants from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux'
import { generateAllProperties, getAllProperties, getRecommendedProp, getPopularProp } from '../store/property/propertyActions';

// Navigator | DRAWER
import DrawerNavigator from "./DrawerNavigator";
// import OnBoardingStackNavigator from "./OnBoardingStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = ( { selectedProperties, selectedRecommended, selectedPopular, setAllProperties, setPopularList, setRecommendedList } ) => {
    const [ userID, setUserID ] = React.useState(null);
    React.useEffect(() => {
        let mounted = true;
        (async () => {
            const userId = await AsyncStorage.getItem( 'userId' )
            if(mounted) {
                if(userId) setUserID(userId)
            }
        })();
        return () => {
            mounted = false;
            setUserID(null)
        }
    }, []);
    // const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)

    const [{ data, loading, error, response }, refetch] = useAxios(
        `${constants.ROOT_URL}/ahuse/api/v1/properties/?cu_id=${userID}`,
        {
            manual: false, // if TRUE, it will not execute immediately
            useCache: true,
            autoCancel: true
        }
    );

    React.useEffect(() => {
        if( !error && data) setAllProperties( data )
        // console.log("Main Stack Nav all properties useEffect action")
        return () => setAllProperties([])
    },[data]);

    // const dispatch = useDispatch();
    // // const propertyData = useSelector( state => state.propertyReducer.allProperties )
    // React.useEffect(() => {
    //     dispatch( generateAllProperties() )
    // }, []);

    React.useEffect(() => {
        if(selectedProperties) {
            setAllProperties( selectedProperties )
            console.log( selectedProperties )
        }
        // console.log("Main Stack Nav all properties useEffect action")
        return () => setAllProperties([])
    },[selectedProperties]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
            // initialRouteName={isLoggedIn ? 'Home' : 'Auth'}
        >
            <Stack.Screen
                name="Auth"
                component={AuthStackNavigator}
            />
            <Stack.Screen
                name="Home"
                component={DrawerNavigator}
            />

        </Stack.Navigator>
    )
}

// export default MainStackNavigator
function mapStateToProps( state ) {
    // console.log(state)
    return {
        selectedProperties: state?.propertyReducer?.allProperties,
        // selectedCats: state?.propertyReducer?.allCategories,
        selectedPopular: state?.propertyReducer?.popular,
        selectedRecommended: state?.propertyReducer?.recommended,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
        // setAllCats: selectedCats => dispatch( getAllCats( selectedCats ) ),
        setPopularList: selectedPopular => dispatch( getPopularProp( selectedPopular ) ),
        setRecommendedList: selectedRecommended => dispatch( getRecommendedProp( selectedRecommended ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( MainStackNavigator )