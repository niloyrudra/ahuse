import { GET_ALL_PROPERTIES, GET_ALL_PROPERTY_DATA_REFETCH, GET_ALL_PROPERTY_DATA_REFETCH_FAIL, GET_ALL_CATS, GET_ALL_TYPES, GET_RECOMMENDED, GET_POPULAR, INSERT_NEW_PROPERTY, INSERT_NEW_PROPERTY_SUCCESS, INSERT_NEW_PROPERTY_FAIL, GET_ALL_TAX_DATA, GET_ALL_TAX_DATA_SUCCESS, GET_ALL_TAX_DATA_FAIL } from "./propertyActions";

const initialState = {
    allProperties: [],
    allCategories: [],
    allTypes: [],
    popular: [],
    recommended: [],
    newPropertyDetail: '',
    allTax: [],
    isLoading: false,
    error: ''
}

const propertyReducer = ( state = initialState, action ) => {
    switch( action.type )
    {
        case GET_ALL_TAX_DATA :
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_TAX_DATA_SUCCESS :
            return {
                ...state,
                allTax: action.payload
                // action_cat: action.payload.action_cat,
                // cat: action.payload.cat,
                // city: action.payload.city,
                // county_state: action.payload.county_state,
                // area: action.payload.area,
                // status: action.payload.status,
            }
        case GET_ALL_TAX_DATA_FAIL :
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case INSERT_NEW_PROPERTY :
            return {
                ...state,
                isLoading: true
            }
        case INSERT_NEW_PROPERTY_SUCCESS :
            return {
                ...state,
                newPropertyDetail: action.payload
            }
        case INSERT_NEW_PROPERTY_FAIL :
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case GET_ALL_PROPERTIES :
        case GET_ALL_PROPERTY_DATA_REFETCH :
            return {
                ...state,
                allProperties: action.payload
            }
        case GET_ALL_CATS :
            return {
                ...state,
                allCategories: action.payload
            }
        case GET_ALL_TYPES :
            return {
                ...state,
                allTypes: action.payload
            }
        case GET_RECOMMENDED :
            return {
                ...state,
                recommended: action.payload
            }
        case GET_POPULAR :
            return {
                ...state,
                popular: action.payload
            }
            
        default :
            return state;
    }
}
export default propertyReducer;