import { SHOW_FAVOURITE_POSTS, SHOW_LIST_DATA } from "./ProfileInfoAction"

const initialValues = {
    favouritePosts: undefined,
    listData: undefined
}

const profileInfoReducer = (state = initialValues, action) => {
    switch (action.type) {
        case SHOW_FAVOURITE_POSTS:
            return{
                ...state,
                favouritePosts: action.payload
            }
        case SHOW_LIST_DATA:
            return{
                ...state,
                listData: action.payload
            }
        default:
            return state
        
    }
}

export default profileInfoReducer