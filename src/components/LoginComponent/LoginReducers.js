import { SUCCESS_USER_LOG } from "./LoginAction"

const initialValues = {
    userData: undefined
}

const loginReducer = (state= initialValues, action) => {
    switch(action.type){
        case SUCCESS_USER_LOG:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state
    }
}

export default loginReducer