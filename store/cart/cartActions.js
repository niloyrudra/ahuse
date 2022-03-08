export const ADD_TO_CART = "ADD_TO_CART"
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS"
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL"

export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"
export const UPDATE_CART_ITEM_SUCCESS = "UPDATE_CART_ITEM_SUCCESS"
export const UPDATE_CART_ITEM_FAIL = "UPDATE_CART_ITEM_FAIL"

export const DELETE_FROM_CART = "DELETE_FROM_CART"
export const DELETE_FROM_CART_SUCCESS = "DELETE_FROM_CART_SUCCESS"
export const DELETE_FROM_CART_FAIL = "DELETE_FROM_CART_FAIL"

export const DELETE_SOLD_CART_ITEMS = "DELETE_SOLD_CART_ITEMS"
export const DELETE_SOLD_CART_ITEMS_SUCCESS = "DELETE_SOLD_CART_ITEMS_SUCCESS"
export const DELETE_SOLD_CART_ITEMS_FAIL = "DELETE_SOLD_CART_ITEMS_FAIL"

// Add To Cart
const insertCartItem = ( cartItem ) => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: cartItem
    }
}
export const setNewCartItem = ( data ) => {

    const d = new Date();
    return dispatch => {
        dispatch( insertCartItem({
            cartId: d.getMilliseconds(),
            cartItemId: data.id,
            cartItem: data,
            // quantity: quantity
        }) )
    }
}

// Delete Cart Item
const deleteCartItem = ( id ) => {
    return {
        type: DELETE_FROM_CART_SUCCESS,
        payload: id
    }
}
export const deleteCartItemAction = ( cartId ) => {

    return dispatch => {
        dispatch( deleteCartItem(cartId) )
    }
}
// Delete Cart Items After Sold
export const deleteSoldCartItemAction = () => {

    return dispatch => {
        dispatch( {
            type: DELETE_SOLD_CART_ITEMS_SUCCESS,
        } )
    }
}