import { authThunk } from "./auth-reducer"


const set_initial_app = 'set_initial_app'
export type SetInitialAPP = {
    type: typeof set_initial_app
}
export type InitialStateType = {
    inital: boolean
}
export const setinitialApp = ():SetInitialAPP => {
    return {
        type: set_initial_app,
    }
} 


let initialState = {
    inital: false
}
const appReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case 'set_initial_app': {
            return {
                ...state, 
                inital: true,
            }
        }
        default:
            return state
    }
}


export const initalApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(authThunk())
        Promise.all([promise])
            .then(()=> {
                dispatch(setinitialApp())
            })
    }
}
export default appReducer