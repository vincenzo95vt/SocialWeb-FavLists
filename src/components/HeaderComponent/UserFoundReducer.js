import { SHOW_DATA_USER_FOUND } from "./UserFoundAction"

const initialValues = {
    userFound: undefined
}

const userFoundReducer = (state = initialValues, action)=>{
    switch (action.type) {
        case SHOW_DATA_USER_FOUND:
            return {
                ...state,
                userFound: action.payload
            }
        default:
            return state
        }
}

export default userFoundReducer