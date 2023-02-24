import messageRegucer from "./message-reducer"
import profileReducer from "./profile-reducer"

const add_post = 'ADDPOST'
const change_post = 'CHANGEPOST'
export const createActionAddPost = () => ({ type: add_post })
export const createActionChangePost = (text) => {
    return {
        type: change_post,
        message: text
    }
}

let store = {
    _state: {
        profilePage: {
            postsList: [
                { likes: '5', message: 'Hello World' },
                { likes: '3', message: 'How are you' },
                { likes: '8', message: 'Hy' },
                { likes: '4', message: 'Hey Mister' }
            ],
            newPostText: ''
        },
        messagePage: {
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
        },
        sideBarPage: {
            friendsOnline: [
                { id: 1, urlImg: 'https://th.bing.com/th/id/R.8bc63af1507ccbc4b54f17ce6c4bc5e3?rik=Dr%2bkLdgIdteJRw&pid=ImgRaw&r=0' },
                { id: 2, urlImg: 'https://th.bing.com/th/id/OIP.HUzMq8Eq3MQDuwDhW6yj3QHaHa?pid=ImgDet&w=768&h=768&rs=1' },
                { id: 3, urlImg: 'https://th.bing.com/th/id/R.d3ab6066dca8d4bfa9693c8cd217f2d1?rik=jiEe2JtIxadoqg&pid=ImgRaw&r=0' },
            ]
        }
    },
    _renderDom() {
        console.log('g');
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagePage = messageRegucer(this._state.messagePage, action)
        this._renderDom(this._state)
        
    },
    _subscribe(observer) {
        this._renderDom = observer
    }


}