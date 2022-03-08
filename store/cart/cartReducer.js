import {ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, UPDATE_CART_ITEM, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAIL, DELETE_FROM_CART, DELETE_FROM_CART_SUCCESS, DELETE_FROM_CART_FAIL, DELETE_SOLD_CART_ITEMS, DELETE_SOLD_CART_ITEMS_SUCCESS, DELETE_SOLD_CART_ITEMS_FAIL } from './cartActions'

const initialState = {
    cartItems: [],
    isLoading: false,
    error: ''
}

const cartReducer = ( state = initialState, action ) => {
    switch( action.type )
    {
        case ADD_TO_CART :
            return {
                ...state,
                isLoading: true
            }
        case ADD_TO_CART_SUCCESS :
            if(state.cartItems.find( item => item.cartItemId == action.payload.cartItemId ))
            {
                return {
                    ...state,
                    cartItems: [...state.cartItems],
                    isLoading: false
                }
            }
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                    isLoading: false
                }
            }
        case ADD_TO_CART_FAIL :
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case DELETE_FROM_CART :
            return {
                ...state,
                isLoading: true,
            }
        case DELETE_FROM_CART_SUCCESS :
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                cartItems: [...state.cartItems.filter( item => item.cartId !== action.payload )]
            }
        case DELETE_FROM_CART_FAIL :
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case DELETE_SOLD_CART_ITEMS :
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case DELETE_SOLD_CART_ITEMS_SUCCESS :
            return {
                ...state,
                isLoading: false,
                cartItems: []
            }
        case DELETE_SOLD_CART_ITEMS_FAIL :
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
            
        default :
            return state
    }
}

export default cartReducer;