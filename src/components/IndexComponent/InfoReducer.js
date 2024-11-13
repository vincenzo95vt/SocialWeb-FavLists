import { SET_LOADING, SHOW_DATA, SHOW_POST } from "./InfoAction"

const initialValues = {
    postInfo: undefined,
    post: undefined,
    isLoading: false
}

export const infoReducer = (state= initialValues, action) =>{
    switch (action.type) {
        case SHOW_DATA:
            return{
                ...state,
                postInfo: action.payload,
                isLoading: false
            }
        case SHOW_POST:
            return{
                ...state,
                post: action.payload,
                isLoading:false

            }
        case SET_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}