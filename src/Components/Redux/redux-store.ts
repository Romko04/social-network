import {combineReducers, legacy_createStore, legacy_createStore as createStore, applyMiddleware} from "redux";
import authReducer from "./auth-reducer";
import messageRegucer from "./message-reducer";
import profileReducer from "./profile-reducer";
import usersRegucer from "./users-reducer";
import thunkMiddleWare from 'redux-thunk'
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageRegucer,
    usersPage: usersRegucer,
    auth: authReducer,
    app: appReducer
})
type RootReducerType = typeof reducers
export type appStateType = ReturnType<RootReducerType>
let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleWare))
export default store