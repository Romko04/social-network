import { authThunk } from "./auth-reducer"


const set_initial_app = 'set_initial_app'

export const setinitialApp = () => {
    return {
        type: set_initial_app,
    }
} 


let initialState = {
    inital: false
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'set_initial_app': {
            return {
                ...state, 
                inital: true
            }
        }
        default:
            return state
    }
}


export const initalApp = () => {
    return (dispatch) => {
        let promise = dispatch(authThunk())
        Promise.all([promise])
            .then(()=> {
                dispatch(setinitialApp())
            })
    }
}
export default appReducer