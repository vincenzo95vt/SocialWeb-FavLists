import { legacy_createStore as create_store } from "redux";
import reducers from "../reducers";

const store = create_store(reducers)

store.subscribe(() =>{

})

export default store