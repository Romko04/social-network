import {combineReducers, legacy_createStore, legacy_createStore as createStore, applyMiddleware} from "redux";
import authReducer from "./auth-reducer.js";
import messageRegucer from "./message-reducer";
import profileReducer from "./profile-reducer";
import sideBarRegucer from "./sidebar-reducer";
import usersRegucer from "./users-reducer";
import thunkMiddleWare from 'redux-thunk'
import appReducer from "./app-reducer.js";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageRegucer,
    sideBarPage: sideBarRegucer,
    usersPage: usersRegucer,
    auth: authReducer,
    app: appReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleWare))
export default store