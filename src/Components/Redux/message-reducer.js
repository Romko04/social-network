import { chatAPI } from "../../api/chat-api"

const set_messages = 'SET_MESSAGES'
const set_status = 'SET_STATUS'
export const setMessages = (messages) => {
    return {
        type: set_messages,
        messages
    }
} 
export const setStatus = (status) => {
    return {
        type: set_status,
        status
    }
} 
let initialState = {
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
let _newMessagesHandlerCreator = null
const newMessagesHandlerCreator =(dispatch)=> {
    if (_newMessagesHandlerCreator === null) {
        _newMessagesHandlerCreator = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _newMessagesHandlerCreator
}
let _statusHandlerCreator = null
const statusHandlerCreator =(dispatch)=> {
    if (_statusHandlerCreator === null) {
        _statusHandlerCreator = (status) => {
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
export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubcribe('messages-received',newMessagesHandlerCreator(dispatch))
    chatAPI.unsubcribe('status-changed',statusHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message) => async () => {
    chatAPI.sendMessage(message)
}


export default messageRegucer