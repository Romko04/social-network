import { chatAPI } from "../../api/chat-api"

const set_messages = 'SET_MESSAGES'
export const setMessages = (messages) => {
    return {
        type: set_messages,
        messages
    }
} 
let initialState = {
    messages: []
}
const messageRegucer = (state = initialState, action) => {
    switch (action.type) {
        case set_messages:{
            return{
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        }
        default:    
            return state
    }
}
let _newMessagesHandlerCreator
const newMessagesHandlerCreator =(dispatch)=> {
    if (!_newMessagesHandlerCreator) {
        _newMessagesHandlerCreator = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _newMessagesHandlerCreator
}
export const startMessagesListening = () => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}
export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubcribe(newMessagesHandlerCreator(dispatch))
}
export const sendMessage = (message) => async () => {
    chatAPI.sendMessage(message)
}


export default messageRegucer