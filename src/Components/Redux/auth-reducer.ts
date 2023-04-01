import { captchaCode, resultCode, setUserTypeData } from './../../types/types';
import { appStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { authApi, getCaptcha, loginAuth, logoutAuth } from "../../api/api"
import { profileUserThunk } from './profile-reducer';

const set_user_data = 'set_user_data'
const set_captcha = 'setCaptcha'
const delete_captcha = 'deleteCaptcha'
export type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captcha: string | null
}
export type setUserDataTypeAction = {
    type: typeof set_user_data
    data: setUserTypeData
}
export type setCaptchaTypeAction = {
    type: typeof set_captcha,
    url: string
}
export type deleteCaptchaTypeAction = {
    type: typeof delete_captcha,
}
export type authActionsTypes = setUserDataTypeAction|setCaptchaTypeAction|deleteCaptchaTypeAction
export const setUserData = (id:number|null, email:string|null, login:string|null, isAuth:boolean):setUserDataTypeAction => {
    return {
        type: set_user_data,
        data: {id, email, login, isAuth}
    }
}
export const setCaptcha = (url: string):setCaptchaTypeAction => ({type:set_captcha, url})
export const deleteCaptcha = ():deleteCaptchaTypeAction => ({type:delete_captcha})


let initialState:initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}
const authReducer = (state = initialState, action:authActionsTypes):initialStateType => {
    switch (action.type) {
        case set_user_data: {
            return {
                ...state, 
                ...action.data,
            }
        }
        case set_captcha: {
            return {
                ...state, 
                captcha: action.url,
            }
        }
        case delete_captcha: {
            return {
                ...state, 
                captcha: '',
            }
        }
        default:
            return state 
    }
}
type thunkType = ThunkAction<Promise<void>,appStateType,unknown,authActionsTypes>
export const authThunk = ():thunkType => {
    return async (dispatch) => {
       const data = await authApi()
        let { email, id, login } = data.data
        dispatch(profileUserThunk(id))
        if (data.resultCode === resultCode.succes) {
            dispatch(setUserData(id, email, login, true))
        }
    }
}
export const loginThunk = (email:string, password:string, rememberMe:boolean, captcha:string, setErrors: Function):thunkType => {
    return async (dispatch) => {
        const data = await loginAuth(email, password, rememberMe, captcha)
        if (data.resultCode === captchaCode.succes) {
            dispatch(authThunk())
        } else {
            if (data.resultCode === captchaCode.captcha) {
                dispatch(getCaptchaUrl())
            }
            setErrors({ apiError: `${data.messages[0]}` })
        }
    }
}
export const logoutThunk = ():thunkType => {
    return async (dispatch) => {
        const data = await logoutAuth()
        if (data.resultCode === resultCode.succes) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}
export const getCaptchaUrl = ():thunkType => {
    return async (dispatch) => {
        const url = await getCaptcha()
            dispatch(setCaptcha(url))
    }
}
export default authReducer