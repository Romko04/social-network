import { chatAPI } from "../../api/chat-api"

const set_messages = 'SET_MESSAGES'
const set_status = 'SET_STATUS'
const delete_messages = 'DELETE_MESSAGES'
export type message = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
export type setMessagesActionType = {
    type: typeof set_messages
    messages: message[]
}
export type setStatusActionType = {
    type: typeof set_status,
    status: string
}
export type deleteMessagesActionType = {
    type: typeof delete_messages,
}
export const setMessages = (messages: message[]):setMessagesActionType => {
    return {
        type: set_messages,
        messages
    }
} 
export const setStatus = (status:string):setStatusActionType => {
    return {
        type: set_status,
        status
    }
} 
export const deleteMessages = ():deleteMessagesActionType => {
    return {
        type: delete_messages,
    }
} 
export type initialStateType = {
    messages: message[],
    status: 'pending' | 'ready'
}
let initialState:initialStateType = {
    messages: [],
    status: 'pending'
}
const messageRegucer = (state = initialState, action) => {
    switch (action.type) {
        case set_messages:{
            return{
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        }
        case delete_messages:{
            return{
                ...state,
                messages: [],
                status: 'pending'
            }
        }
        case set_status:{
            return{
                ...state,
                status: action.status
            }
        }
        default:    
            return state
    }
}
let _newMessagesHandlerCreator: null| any = null
const newMessagesHandlerCreator =(dispatch:any)=> {
    if (_newMessagesHandlerCreator === null) {
        _newMessagesHandlerCreator = (messages: message[]) => {
            dispatch(setMessages(messages))
        }
    }
    return _newMessagesHandlerCreator
}
let _statusHandlerCreator: null | any = null
const statusHandlerCreator =(dispatch:any)=> {
    if (_statusHandlerCreator === null) {
        _statusHandlerCreator = (status:string) => {
            dispatch(setStatus(status))
        }
    }
    return _statusHandlerCreator
}
export const startMessagesListening = () => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusHandlerCreator(dispatch))
}
export const stopMessagesListening = () => async (dispatch:any) => {
    dispatch(deleteMessages())
    chatAPI.unsubcribe('messages-received',newMessagesHandlerCreator(dispatch))
    chatAPI.unsubcribe('status-changed',statusHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message:string) => async () => {
    debugger
    chatAPI.sendMessage(message)
}


export default messageRegucer