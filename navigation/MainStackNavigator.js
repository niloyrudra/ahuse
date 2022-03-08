import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import constants from "../constants/constants";

import { connect } from 'react-redux'
import { getAllProperties, getRecommendedProp, getPopularProp } from '../store/property/propertyActions';

// Navigator | DRAWER
import DrawerNavigator from "./DrawerNavigator";
import OnBoardingStackNavigator from "./OnBoardingStackNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = ( { selectedProperties, selectedRecommended, selectedPopular, setAllProperties, setPopularList, setRecommendedList } ) => {

    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)

    const [{ data, loading, error, response }, refetch] = useAxios(
        `${constants.ROOT_URL}/ahuse/api/v1/properties`,
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

    React.useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token");
            if(token) setIsLoggedIn(true)
        })();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            // initialRouteName={'Home'}
            initialRouteName={isLoggedIn ? 'Home' : 'OnBoarding'}
        >
            { !isLoggedIn && 
                <Stack.Screen
                    name="OnBoarding"
                    component={OnBoardingStackNavigator}
                />
            }
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