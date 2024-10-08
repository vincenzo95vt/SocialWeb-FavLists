import { combineReducers } from "redux";
import loginReducer from "../../../components/LoginComponent/LoginReducers";
import { infoReducer } from "../../../components/IndexComponent/InfoReducer";
import profileInfoReducer from "../../../components/ProfileInfoComponent/ProfileInfoReducer";
import userFoundReducer from "../../../components/HeaderComponent/UserFoundReducer";


const reducers = combineReducers({
    loginReducer,
    infoReducer,
    profileInfoReducer,
    userFoundReducer
})

export default reducers