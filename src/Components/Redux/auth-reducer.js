import { authApi, loginAuth, logoutAuth } from "../../api/api"

const set_user_data = 'set_user_data'

export const setUserData = (id, email, login, isAuth) => {
    return {
        type: set_user_data,
        data: {id, email, login, isAuth}
    }
} 


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'set_user_data': {
            return {
                ...state, 
                ...action.data,
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
export const loginThunk = (email, password, rememberMe, setErrors) => {
    return async (dispatch) => {
        const data = await loginAuth(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(authThunk())
        } else {
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
export default authReducer