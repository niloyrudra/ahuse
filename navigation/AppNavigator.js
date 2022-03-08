
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

// import OnBoardingStackNavigator from './OnBoardingStackNavigator';
import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
    // LoadingFonts

    return (
        <NavigationContainer>
            {/* <OnBoardingStackNavigator /> */}
            <MainStackNavigator />
        </NavigationContainer>
    )
    
}

export default AppNavigator