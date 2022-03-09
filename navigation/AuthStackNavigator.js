import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//Screens
import SignIn from '../screens/Authentication/SignIn'
import SignUp from '../screens/Authentication/SignUp'
import ForgotPassword from '../screens/Authentication/ForgotPassword'

// Initiate Stack Navigator
const AuthStack = createStackNavigator()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={'SignIn'}
    >
        <AuthStack.Screen
            name="SignIn"
            component={SignIn}
        />

        <AuthStack.Screen
            name="SignUp"
            component={SignUp}
        />

        <AuthStack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
        />

    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator