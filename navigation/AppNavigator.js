
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    )
    
}

export default AppNavigator