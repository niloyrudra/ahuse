import constants from "../../constants/constants"

export const GET_ALL_PROPERTIES = "GET_ALL_PROPERTIES"
export const GET_ALL_PROPERTY_FAIL = "GET_ALL_PROPERTY_FAIL"
export const GET_ALL_PROPERTY_DATA_REFETCH = "GET_ALL_PROPERTY_DATA_REFETCH"
export const GET_ALL_PROPERTY_DATA_REFETCH_FAIL = "GET_ALL_PROPERTY_DATA_REFETCH_FAIL"
export const GET_ALL_CATS = "GET_ALL_CATS"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const GET_POPULAR = "GET_POPULAR"
export const GET_RECOMMENDED = "GET_RECOMMENDED"

export const INSERT_NEW_PROPERTY = "INSERT_NEW_PROPERTY"
export const INSERT_NEW_PROPERTY_SUCCESS = "INSERT_NEW_PROPERTY_SUCCESS"
export const INSERT_NEW_PROPERTY_FAIL = "INSERT_NEW_PROPERTY_FAIL"

export const GET_ALL_TAX_DATA = "GET_ALL_TAX_DATA"
export const GET_ALL_TAX_DATA_SUCCESS = "GET_ALL_TAX_DATA_SUCCESS"
export const GET_ALL_TAX_DATA_FAIL = "GET_ALL_TAX_DATA_FAIL"

export const SET_FAV_PROPERTY_LIST = "SET_FAV_PROPERTY_LIST"
export const SET_FAV_PROPERTY_LIST_FAIL = "SET_FAV_PROPERTY_LIST_FAIL"

// Local Storage
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Insert New Property
const setNewProperty = ( newProperty ) => {
    return {
        type: INSERT_NEW_PROPERTY_SUCCESS,
        payload: newProperty
    }
}
export const insertNewProperty = ( data, token, setIsLoading, setRequestStatus ) => {

    // console.log("Inserting Property...",token)
    return dispatch => {
        fetch( `${constants.ROOT_URL}/ahuse/api/v1/properties/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        } )
        .then(res => res.json())
        .then( resData => {

            // console.log("Insertion done!",resData);
            
            if( resData.success )
            {
                // console.log('Success - ', resData);
                dispatch( setNewProperty(resData.data) );
                setRequestStatus({
                    success:true,
                    fail:false,
                    msg: "Congratulations! Your request has submitted successfully."
                });
                dispatch( getAllRefetchPropertyData() )
            }

            setIsLoading(false);
            setRequestStatus({
                success:false,
                fail:false,
                msg: "Oops! Something went wrong. Please try again."
            })
        })
        .catch(error => {
            console.log("Inserting Property Fails", error)
            dispatch({ type: INSERT_NEW_PROPERTY_FAIL, error: error })
            setIsLoading(false)
            setRequestStatus({
                success:false,
                fail:true,
                msg: "Sorry! Your request failed. Please check and try again."
            })
        })
    }
}

// Get All Recommended Properties
const setRecommendedList = ( recommends ) => {
    return {
        type: GET_RECOMMENDED,
        payload: recommends
    }
}
export const getRecommendedProp = ( data ) => {
    return dispatch => dispatch( setRecommendedList(data) )
}

// Get All Popular Properties
const setPopularList = ( populars ) => {
    return {
        type: GET_POPULAR,
        payload: populars
    }
}
export const getPopularProp = ( data ) => {
    return dispatch => dispatch( setPopularList(data) )
}

// Get All Categories
const setTypeList = ( types ) => {
    return {
        type: GET_ALL_TYPES,
        payload: types
    }
}
export const getAllTypes = ( data ) => {
    return dispatch => dispatch( setTypeList(data) )
}

// Get All Type/Action
const setCategoryList = ( catData ) => {
    return {
        type: GET_ALL_CATS,
        payload: catData
    }
}
export const getAllCats = ( data ) => {
    return dispatch => dispatch( setCategoryList( data ) )
}

// Get All Properties
const setPropertyList = ( propertyData ) => {
    return {
        type: GET_ALL_PROPERTIES,
        payload: propertyData
    }
}
export const getAllProperties = (propertyData) => {
    return dispatch => dispatch( setPropertyList( propertyData ) )
}


// Get All Properties Refetching
const setAllRefetchPropertyData = ( reFetchedData ) => {
    return {
        type: GET_ALL_PROPERTY_DATA_REFETCH,
        payload: reFetchedData
    }
}
export const getAllRefetchPropertyData = () => {
    return async (dispatch) => {
        try {
            const userId = await AsyncStorage.getItem( "userId" );
            const url = userId ? `${constants.ROOT_URL}/ahuse/api/v1/properties/?cu_id=${userId}` : `${constants.ROOT_URL}/ahuse/api/v1/properties`;
            fetch( url, { method: "GET" } )
                .then( res => res.json() )
                .then( data => {
                    console.log("Data ReFetched >>>>> ", data.length)
                    if(data)
                    {
                        dispatch( setAllRefetchPropertyData( data ) )
                    }
                } )
                .catch( error => {
                    dispatch({
                        type: GET_ALL_PROPERTY_DATA_REFETCH_FAIL,
                        error: error
                    })
                } );
        }
        catch(err) {
            dispatch({
                type: GET_ALL_PROPERTY_DATA_REFETCH_FAIL,
                error: error
            })
        }
    }
}

// Get All Properties
const setAllTaxData = ( taxData ) => {
    return {
        type: GET_ALL_TAX_DATA_SUCCESS,
        payload: taxData
    }
}
export const getAllTaxData = () => {
    return dispatch => {
        fetch( `${constants.ROOT_URL}/ahuse/api/v1/taxonomies`, { method: "GET" } )
            .then( res => res.json() )
            .then( taxData => {
                // console.log("Tax Data >>>>> ", taxData)
                if(taxData)
                {
                    dispatch( setAllTaxData( taxData ) )
                }
            } )
            .catch( error => {
                dispatch({
                    type: GET_ALL_TAX_DATA_FAIL,
                    error: error
                })
            } )
    }
}

// Create / Delete Fav Property List by User and Property Ids
const setFavProperty = ( data ) => {
    return {
        type: SET_FAV_PROPERTY_LIST,
        payload: data
    }
}

export const updateFavPropertyList = ( propertyId ) => {
    return async dispatch => {
        try{
            const token = await AsyncStorage.getItem( 'token' );
            const userId = await AsyncStorage.getItem( 'userId' );
            if( token, propertyId, userId ) {
                fetch(`${constants.ROOT_URL}/ahuse/api/v1/fav`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": "Bearer " + token
                    },                
                    body: JSON.stringify({
                        user_id: userId,
                        prop_id: propertyId
                    })
                  })
                  .then( res => res.json() )
                  .then(response => {
                        console.log("Fav", response)
                    dispatch( setFavProperty(response) );
                    dispatch( getAllRefetchPropertyData() );
                  })
                  .catch(error => {
                      console.log("TempToken Action Fails...")
                      dispatch({
                          type: SET_TEMP_TOKEN_FAIL,
                          error: error
                      })
                  });
            }
        }
        catch(err) {
            console.log( "Failed updating Fav Property List", err )
            dispatch({
                type: SET_FAV_PROPERTY_LIST_FAIL,
                error: err
            })
        }
    }
}