import constants from '../../constants/constants'

export const SIGN_IN = "SIGN_IN"
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const SIGN_IN_FAIL = "SIGN_IN_FAIL"

export const SIGN_UP = "SIGN_UP"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAIL = "SIGN_UP_FAIL"

export const SET_TEMP_TOKEN = "SET_TEMP_TOKEN"
export const GET_TEMP_TOKEN = "GET_TEMP_TOKEN"
export const SET_TEMP_TOKEN_SUCCESS = "SET_TEMP_TOKEN_SUCCESS"
export const SET_TEMP_TOKEN_FAIL = "TEMP_TOSET_KEN_FAIL"
export const LOG_OUT = "LOG_OUT"


// Local Storage
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

// SIGN_UP ACTION
// export const setTempToken = ( temp_token ) => {
export const getTempToken = () => {

    return dispatch => {
        axios.post("https://niloyrudra.com/workshop/ahuse/wp-json/jwt-auth/v1/token", {
          username: 'erbcc',
          password: '#6Y5H7*g9t5xK%^4iadRfXPy'
        })
          .then(response => {
            //   console.log(response?.data?.token)
            if( response.data.token)
            {
              //Set token and email in local storage in case Redux data is lost
              dispatch({type: SET_TEMP_TOKEN, temp_token: response.data.token});
              AsyncStorage.setItem("temporaryToken", response.data.token);
            }
        })
        .catch(error => {
            console.log("TempToken Action Fails...")
            dispatch({
                type: SET_TEMP_TOKEN_FAIL,
                error: error
            })
        })
    }
}

// SIGN_UP ACTION
export const userSignUpAction = ( userData, setIsLoading, setRequestStatus ) => {

    return dispatch => {
        fetch( `${constants.ROOT_URL}/wp/v2/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": "Bearer " + userData.tempToken
            },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
                email: userData.email,
            })
        } )
        .then(res => res.json())
        .then( userData => {
            dispatch({
                type: SIGN_UP_SUCCESS,
                userDetail:userData,
            })

            setIsLoading(false)
            setRequestStatus(true)
        })
        .catch(error => {
            console.log("Sign Up Fails", error)
            dispatch({ type: SIGN_UP_FAIL, error: error })
            setIsLoading(false)
        })
    }
}

// SIGN_IN ACTION
export const userSignInAction = ( userData ) => {

    return dispatch => {
        // try{
            // const response = await axios.post( `${constants.ROOT_URL}wp-json/jwt-auth/v1/token`, userData )
            fetch( `${constants.ROOT_URL}/jwt-auth/v1/token`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password,
                })
            } )
            .then( res => res.json() )
            .then( data => {
                console.log(data)
                dispatch({
                        type: SIGN_IN_SUCCESS,
                        userData: {
                            user_nicename: data.user_nicename,
                            email: data.email,
                            user_display_name: data.user_display_name,
                        },
                        token: data.token
                })

                // Local Storage
                AsyncStorage.removeItem("tempToken")
                AsyncStorage.setItem("token", data.token)
                AsyncStorage.setItem("email", data.user_email)
                AsyncStorage.setItem("username", data.user_nicename)
                AsyncStorage.setItem("displayName", data.user_nicename)

            } )
            .catch(error => {
                console.log("SignIn Action Fails...")
                dispatch({
                    type: SIGN_IN_FAIL,
                    error: error
                })
            })

            // const responseJson = response.json()
            // await console.log(responseJson)

            // await dispatch({
            //     type: SIGN_IN_SUCCESS,
            //     userData: {
            //         user_nicename: responseJson.user_nicename,
            //         email: responseJson.email,
            //         user_display_name: responseJson.user_display_name,
            //     },
            //     token: responseJson.token
            // })
            // await console.log(" SignIn - dispatching done")
        // }
        
        // }

    };
}

// SIGN_OUT ACTION
export const userSignOutAction = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("tempToken")
        await AsyncStorage.removeItem("email")
        await AsyncStorage.removeItem("username")
        await AsyncStorage.removeItem("displayName")
        await dispatch({ type: LOG_OUT })
    }
}