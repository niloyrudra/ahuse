import 'react-native-gesture-handler'
import React from "react";

// Fonts
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import thunk from 'redux-thunk'
import rootReducer from "./store/rootReducer";

// Navigator
import AppNavigator from './navigation/AppNavigator';

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
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}

export default App