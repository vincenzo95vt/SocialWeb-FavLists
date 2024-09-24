import { combineReducers } from "redux";
import loginReducer from "../../../components/LoginComponent/LoginReducers";
import { infoReducer } from "../../../components/IndexComponent/InfoReducer";


const reducers = combineReducers({
    loginReducer,
    infoReducer
})

export default reducers