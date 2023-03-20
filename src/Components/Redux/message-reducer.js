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
export default messageRegucer