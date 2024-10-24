import { SHOW_FAVOURITE_POSTS, SHOW_LIST_DATA, SHOW_USER_LIST } from "./ProfileInfoAction"

const initialValues = {
    favouritePosts: undefined,
    listData: undefined,
    listUser: undefined
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
        case SHOW_USER_LIST:
            return{
                ...state,
                listUser: action.payload
            }
        default:
            return state
        
    }
}

export default profileInfoReducer