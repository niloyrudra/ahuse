import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import SplashScreen from 'react-native-splash-screen'

// Screens
import OnBoarding from '../screens/OnBoarding/OnBoarding'
import SignIn from '../screens/Authentication/SignIn'
import SignUp from '../screens/Authentication/SignUp'
import ForgotPassword from '../screens/Authentication/ForgotPassword'
import Otp from '../screens/Authentication/Otp'

const Stack = createStackNavigator();

const OnBoardingStackNavigator = () => {
    
    // React.useEffect(() => {
    //     SplashScreen.hide();
    // }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Boarding'}
        >
            <Stack.Screen
                name="Boarding"
                component={OnBoarding}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />

            <Stack.Screen
                name="Otp"
                component={Otp}
            />
        </Stack.Navigator>
    )
}

export default OnBoardingStackNavigator