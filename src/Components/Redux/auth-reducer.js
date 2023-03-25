import { authApi, getCaptcha, loginAuth, logoutAuth } from "../../api/api"

const set_user_data = 'set_user_data'
const set_captcha = 'setCaptcha'
const delete_captcha = 'deleteCaptcha'

export const setUserData = (id, email, login, isAuth) => {
    return {
        type: set_user_data,
        data: {id, email, login, isAuth}
    }
}
export const setCaptcha = (url) => ({type:set_captcha, url})
export const deleteCaptcha = () => ({type:delete_captcha})


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}
const authReducer = (state = initialState, action) => {
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
    return async (dispatch) => {
       const data = await authApi()
        let { email, id, login } = data.data
        if (data.resultCode === 0) {
            dispatch(setUserData(id, email, login, true))
        }
    }
}
export const loginThunk = (email, password, rememberMe, captcha, setErrors) => {
    return async (dispatch) => {
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
    return async (dispatch) => {
        const data = await logoutAuth()
        if (data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}
export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const url = await getCaptcha()
            dispatch(setCaptcha(url))
    }
}
export default authReducer