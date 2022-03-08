import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_OUT, SET_TEMP_TOKEN } from "./userActions";

const initialState = {
    users: [],
    username: "",
    email: "",
    displayname: "",
    token: "",
    tempToken: '',
    error: null,
    isLoading: false
};
const userReducer = ( state = initialState, action ) => {
    switch( action.type )
    {
        case SIGN_UP: 
            return {
                ...state,
                isLoading: true
            };
        case SIGN_UP_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                username: action.userDetail.user_nicename,
                email: action.userDetail.user_email,
                displayname:  action.userDetail.user_display_name ? action.userDetail.user_display_name : '',
                // token: action.token
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        case SIGN_IN: 
            return {
                ...state,
                isLoading: true
            };
        case SIGN_IN_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                username: action.userData.user_nicename,
                email: action.userData.user_email,
                displayname:  action.userData.user_display_name ? action.userData.user_display_name : '',
                token: action.token
            }
        case SIGN_IN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case LOG_OUT:
            return {
                ...state,
                isLoading: false,
                username: "",
                email: "",
                displayname: "",
                token: "",
                tempToken: '',
            };
        case SET_TEMP_TOKEN:
            return {
                ...state,
                isLoading: false,
                tempToken: action.temp_token,
            };
        
        default :
            return state;
    }
}

export default userReducer;