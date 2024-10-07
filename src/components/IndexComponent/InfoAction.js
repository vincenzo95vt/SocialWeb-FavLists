export const SHOW_DATA = "SHOW_DATA"
export const SET_LOADING ="SET_LOADING"


export const showData = (info) => {
    return {
        type: SHOW_DATA,
        payload: info
    }
}

export const setLoading = (loading) => {
    return{
        type: SET_LOADING,
        payload: loading
    }
}