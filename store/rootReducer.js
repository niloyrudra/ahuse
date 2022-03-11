import { combineReducers } from 'redux'

import tabReducer from "./tab/tabReducers";
import propertyReducer from './property/propertyReducer';
import userReducer from './user/userReducer';
// import cartReducer from './cart/cartReducer';

export default combineReducers({
    tabReducer,
    propertyReducer,
    userReducer
})