export const SET_SELECTED_TAB = "SET_SELECTED_TAB"


const setSelectedTabSuccess = ( tabPayload ) => {
    return {
        type: SET_SELECTED_TAB,
         payload: {tabPayload}
    }
}
export const setSelectedTab = ( selectedTab ) => {
    return dispatch => {
        dispatch( setSelectedTabSuccess( selectedTab ) )
    }
}