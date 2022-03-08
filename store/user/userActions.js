// import ENV from '@env';
import constants from '../../constants/constants'

export const SIGN_IN = "SIGN_IN"
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const SIGN_IN_USER_DATA_SUCCESS = "SIGN_IN_USER_DATA_SUCCESS"
export const SIGN_IN_FAIL = "SIGN_IN_FAIL"

export const SIGN_UP = "SIGN_UP"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAIL = "SIGN_UP_FAIL"

export const SET_TEMP_TOKEN = "SET_TEMP_TOKEN"
export const GET_TEMP_TOKEN = "GET_TEMP_TOKEN"
export const SET_TEMP_TOKEN_SUCCESS = "SET_TEMP_TOKEN_SUCCESS"
export const SET_TEMP_TOKEN_FAIL = "SET_TEMP_TOKEN_FAIL"
export const LOG_OUT = "LOG_OUT"


// Local Storage
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

// SIGN_UP ACTION
// export const setTempToken = ( temp_token ) => {
export const getTempToken = () => {

    return dispatch => {
        // axios.post(`${constants.ROOT_URL}/jwt-auth/v1/token`, {
        axios.post(`${constants.ROOT_URL}/api/v1/token`, {
          username: constants.USERNAME,
          password: constants.PASSWORD
        })
        .then(response => {
              console.log("TempToken", response.data)
            if( response.data.jwt_token)
            {
              //Set token and email in local storage in case Redux data is lost
              dispatch({type: SET_TEMP_TOKEN, temp_token: response.data.jwt_token, tempTokenExpIn: response.data.expires_in, tokenType: response.data.token_type});
              AsyncStorage.setItem("temporaryToken", JSON.stringify( response.data.jwt_token ));
              AsyncStorage.setItem("tokenType", JSON.stringify( response.data.token_type ));
              AsyncStorage.setItem("tempTokenExpIn", JSON.stringify( response.data.expires_in ));
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
        fetch( `${constants.ROOT_URL}/wp/v2/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": "Bearer " + userData.tempToken
            },
            body: JSON.stringify({
                username: userData.username.trim(),
                password: userData.password,
                email: userData.email,
            })
        } )
        .then(res => res.json())
        .then( userData => {
            console.log(userData)
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
export const userSignInAction = ( userData, setIsLoading ) => {

    return async  dispatch => {
        // try{
            // const response = await axios.post( `${constants.ROOT_URL}wp-json/jwt-auth/v1/token`, userData )
            // fetch( `${constants.ROOT_URL}/jwt-auth/v1/token`, {
            await fetch( `${constants.ROOT_URL}/api/v1/token`, {
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
                console.log("signIn",data)
                dispatch({
                        type: SIGN_IN_SUCCESS,
                        token: data.jwt_token,
                        TokenExpIn: data.expires_in,
                        tokenType: data.token_type
                })

                // Local Storage
                AsyncStorage.removeItem("tempToken")
                AsyncStorage.setItem("token", JSON.stringify( data.jwt_token ))
                AsyncStorage.setItem("TokenExpIn", JSON.stringify( data.expires_in ))
            } )
            .catch(error => {
                console.log("SignIn Action Fails...", error)
                dispatch({
                    type: SIGN_IN_FAIL,
                    error: error
                })
                // setIsLoading(false)
            })

            // WP_Authenticate - To Get User Data
            fetch( `${constants.ROOT_URL}/wp/v2/users/auth?username=${userData.username}&password=${userData.password}`, {
                method:"GET",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            } )
            .then( res => res.json() )
            .then( resJson => {
                console.log(resJson)
                if( resJson.status == 200 ){
                    dispatch({
                        type: SIGN_IN_USER_DATA_SUCCESS,
                        userData: {
                            user_id: resJson.user.id,
                            user_nicename: resJson.user.username,
                            email: resJson.user.user_email,
                            user_display_name: resJson.user.display_name,
                            role: resJson.user.role
                        },
                    })
                    AsyncStorage.setItem("userId", JSON.stringify( resJson.user.id ))
                    AsyncStorage.setItem("email", JSON.stringify( resJson.user.user_email ))
                    AsyncStorage.setItem("username", JSON.stringify( resJson.user.username ))
                    AsyncStorage.setItem("displayName", JSON.stringify( resJson.user.display_name ))
                    AsyncStorage.setItem("role", JSON.stringify( resJson.user.role ))
                    setIsLoading(false)
                }
            } )
            .catch(error => {
                console.log(error)
                dispatch({
                    type: SIGN_IN_USER_DATA_FAIL,
                    error: error
                })
                setIsLoading(false)
            })
    };
}

// SIGN_OUT ACTION
export const userSignOutAction = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("tempToken")
        await AsyncStorage.removeItem("TokenExpIn")
        await AsyncStorage.removeItem("email")
        await AsyncStorage.removeItem("username")
        await AsyncStorage.removeItem("displayName")
        await AsyncStorage.removeItem("userId")
        await AsyncStorage.removeItem("role")
        await AsyncStorage.removeItem(`favProps`)
        dispatch({ type: LOG_OUT })
    }
}