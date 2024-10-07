export const SHOW_FAVOURITE_POSTS = "SHOW_FAVOURITE_POSTS"
export const SHOW_LIST_DATA = "SHOW_LIST_DATA"

export const showFavouritePosts = (data) => {
    return {
        type: SHOW_FAVOURITE_POSTS,
        payload: data
    }
}

export const showListData = (data) => {
    return {
        type: SHOW_LIST_DATA,
        payload: data
    }
}
