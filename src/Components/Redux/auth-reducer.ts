import { authApi, getCaptcha, loginAuth, logoutAuth } from "../../api/api"

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
export type setUserTypeData = {
    id:number|null, email:string|null, login:string|null, isAuth:boolean
}
export type setCaptchaTypeAction = {
    type: typeof set_captcha,
    url: string
}
export type deleteCaptchaTypeAction = {
    type: typeof delete_captcha,
}
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
const authReducer = (state = initialState, action:any):initialStateType => {
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
export const authThunk = () => {
    return async (dispatch:any) => {
       const data = await authApi()
        let { email, id, login } = data.data
        if (data.resultCode === 0) {
            dispatch(setUserData(id, email, login, true))
        }
    }
}
export const loginThunk = (email:string, password:string, rememberMe:boolean, captcha:string, setErrors: Function) => {
    return async (dispatch:any) => {
        const data = await loginAuth(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(authThunk())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            setErrors({ apiError: `${data.messages[0]}` })
        }
    }
}
export const logoutThunk = () => {
    return async (dispatch: any) => {
        const data = await logoutAuth()
        if (data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}
export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const url = await getCaptcha()
            dispatch(setCaptcha(url))
    }
}
export default authReducer