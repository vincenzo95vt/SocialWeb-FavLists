export const SHOW_DATA = "SHOW_DATA"
export const SHOW_POST = "SHOW_POST"
export const SET_LOADING ="SET_LOADING"


export const showData = (info) => {
    return {
        type: SHOW_DATA,
        payload: info
    }
}

export const showPost = (post) => {
    return {
        type: SHOW_POST,
        payload: post
    }
}

export const setLoading = (loading) => {
    return{
        type: SET_LOADING,
        payload: loading
    }
}