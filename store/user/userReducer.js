import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_USER_DATA_SUCCESS, SIGN_IN_USER_DATA_FAIL, SIGN_IN_FAIL, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_OUT, SET_TEMP_TOKEN, SET_USER_ID, RESET_PASSWORD_FAIL } from "./userActions";

const initialState = {
    users: [],
    userId: "",
    username: "",
    email: "",
    displayname: "",
    role: "",
    token: "",
    tempToken: '',
    tempTokenExpIn: 0,
    TokenExpIn: 0,
    tokenType: 'Bearer',
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
                token: action.token,
                TokenExpIn: action.TokenExpIn,
                tokenType: action.tokenType,
            }
        case SIGN_IN_USER_DATA_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                userId: action.userData.user_id ? action.userData.user_id : null,
                username: action.userData.user_nicename ? action.userData.user_nicename : '',
                email: action.userData.email ? action.userData.email : '',
                displayname:  action.userData.user_display_name ? action.userData.user_display_name : '',
                role:  action.userData.role ? action.userData.role : 'subscriber',
            }
        case SIGN_IN_FAIL:
        case SIGN_IN_USER_DATA_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case LOG_OUT:
            return {
                ...state,
                isLoading: false,
                userId: "",
                username: "",
                email: "",
                displayname: "",
                role: "",
                token: "",
                tempToken: '',
                tempTokenExpIn: 0,
                TokenExpIn: 0,
            };
        case SET_TEMP_TOKEN:
            return {
                ...state,
                isLoading: false,
                tempToken: action.temp_token,
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        
        default :
            return state;
    }
}

export default userReducer;