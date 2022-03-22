import 'react-native-gesture-handler'
import React from "react";

// Fonts
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Stripe Provider
import { StripeProvider } from '@stripe/stripe-react-native';

// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import thunk from 'redux-thunk'
import rootReducer from "./store/rootReducer";

// Navigator
import AppNavigator from './navigation/AppNavigator';

// Constants
import constants from './constants/constants';


// Store
const store = createStore( rootReducer, applyMiddleware( thunk ) )

const App = () => {
    // LoadingFonts
    let [fontsLoaded] = useFonts({
        "Poppins-Black" : require( './assets/fonts/Poppins-Black.ttf' ),
        "Poppins-Bold" : require( './assets/fonts/Poppins-Bold.ttf' ),
        "Poppins-SemiBold" : require( './assets/fonts/Poppins-SemiBold.ttf' ),
        "Poppins-Regular" : require( './assets/fonts/Poppins-Regular.ttf' ),
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <StripeProvider
                publishableKey={constants.PUBLISHABLE_KEY}
            >
                <Provider store={store}>
                    <AppNavigator />
                </Provider>
            </StripeProvider>
        )
    }
}

export default App