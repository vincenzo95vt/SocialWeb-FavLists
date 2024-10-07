import { combineReducers } from "redux";
import loginReducer from "../../../components/LoginComponent/LoginReducers";
import { infoReducer } from "../../../components/IndexComponent/InfoReducer";
import profileInfoReducer from "../../../components/ProfileInfoComponent/ProfileInfoReducer";


const reducers = combineReducers({
    loginReducer,
    infoReducer,
    profileInfoReducer
})

export default reducers