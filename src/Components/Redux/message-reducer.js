const add_message = 'ADDMESSAGE'
const change_message = 'CHANGEMESSAGE'
export const createActionAddMessage = () => ({ type: add_message })
export const createActionChangeMessage = (text) => {
    return {
        type: change_message,
        text: text
    }
} 
let def = {
    usersDialogs: [
        { name: 'Roman', id: 1, urlImg: 'https://th.bing.com/th/id/R.8bc63af1507ccbc4b54f17ce6c4bc5e3?rik=Dr%2bkLdgIdteJRw&pid=ImgRaw&r=0' },
        { name: 'Karina', id: 2, urlImg: 'https://th.bing.com/th/id/OIP.HUzMq8Eq3MQDuwDhW6yj3QHaHa?pid=ImgDet&w=768&h=768&rs=1' },
        { name: 'Myron', id: 3, urlImg: 'https://th.bing.com/th/id/R.d3ab6066dca8d4bfa9693c8cd217f2d1?rik=jiEe2JtIxadoqg&pid=ImgRaw&r=0' },
        { name: 'Oksana', id: 4, urlImg: 'https://th.bing.com/th/id/OIP.r-9P-9hCzrVk2SGkIAcaMgHaHa?pid=ImgDet&w=201&h=201&c=7&dpr=1.4' },
        { name: 'Vlad', id: 5, urlImg: 'https://th.bing.com/th/id/OIP.o9b1jdRh7thB3Khdo5Mx1gHaHa?pid=ImgDet&w=201&h=201&c=7&dpr=1.4' },
    ],
    dailog: [
        { message: 'Hello', id: 1 },
        { message: 'My name is Roman', id: 2 },
        { message: 'Who are you', id: 3 },
        { message: 'ok', id: 4 },
        { message: 'yes', id: 5 },
    ],
    newMessage: ''
}
const messageRegucer = (state = def, action) => {
    switch (action.type) {
        case 'ADDMESSAGE':{
            debugger
            let newMessage = {
                id: 26,
                message: state.newMessage
            }
            return {
                ...state,
                dailog: [...state.dailog, newMessage],
                newMessage: ''
            }
        }
        case 'CHANGEMESSAGE':{
            return{
                ...state,
                newMessage: action.text
            }
        }
        default:    
            return state
    }
}
export default messageRegucer