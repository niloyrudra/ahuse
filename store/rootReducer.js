import { combineReducers } from 'redux'

import tabReducer from "./tab/tabReducers";
import propertyReducer from './property/propertyReducer';
import userReducer from './user/userReducer';

export default combineReducers({
    tabReducer,
    propertyReducer,
    userReducer
})