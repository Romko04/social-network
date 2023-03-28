import {combineReducers, legacy_createStore, legacy_createStore as createStore, applyMiddleware} from "redux";
import authReducer from "./auth-reducer.ts";
import messageRegucer from "./message-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import usersRegucer from "./users-reducer.ts";
import thunkMiddleWare from 'redux-thunk'
import appReducer from "./app-reducer.ts";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageRegucer,
    usersPage: usersRegucer,
    auth: authReducer,
    app: appReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleWare))
export default store