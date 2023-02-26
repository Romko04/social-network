import { getStatusProfile, userProfileApi, updateStatusProfile, updatePhoto } from "../../api/api"

const add_post = 'ADDPOST'
const change_post = 'CHANGEPOST'
const set_profile_id = 'set_profile_id'
const set_user_status = 'setUserStatus'
const set_photo = 'setPhoto'


export const createActionAddPost = () => ({ type: add_post })
export const createActionChangePost = (text) => {
    return {
        type: change_post,
        message: text
    }
}
export const setProfileId = (data) => {
    return {
        type: set_profile_id,
        data: data
    }
}
export const setUserStatus = (status) => {
    return {
        type: set_user_status,
        status
    }
}
export const setPhoto = (data) => {
    return {
        type: set_photo,
        photos: data
    }
}
let def = {
    postsList: [
        { likes: '5', message: 'Hello World', id:1 },
        { likes: '3', message: 'How are you', id:2 },
        { likes: '8', message: 'Hy', id:'3' },
        { likes: '4', message: 'Hey Mister',id:4 }
    ],
    newPostText: '',
    profileId: null,
    status: ''
}
const profileReducer = (state = def, action) => {
    switch (action.type) {
        case 'ADDPOST': {
            const newPost = {
                likes: '6',
                message: state.newPostText,
                id: '10'
            }
            return {
                ...state,
                postsList: [...state.postsList, newPost],
                newPostText: ''
            }

        }
        case 'CHANGEPOST': {
            return {
                ...state,
                newPostText: action.message
            }
        }
        case 'set_profile_id': {
            return {
                ...state,
                profileId: action.data
            }
        }
        case 'setUserStatus': {
            return {
                ...state,
                status: action.status
            }
        }
        case set_photo: {

            console.log(action.data);
            return {
                ...state,
                profileId: {...state.profileId, photos: action.photos}
            }
        }
        default:
            return state
    }
}
export const profileUserThunk = (id) => {
    return async (dispatch) => {
       const data = await userProfileApi(id)
            dispatch(setProfileId(data))
    }
}
export const statusUserThunk = (id) => {
    return async (dispatch) => {
        const status = await getStatusProfile(id)
        dispatch(setUserStatus(status))
    }
}
export const updateStatusThunk= (status) => {
    return async (dispatch) => {
        const data = await updateStatusProfile(status)
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
    }
}
export const addPhoto = (file) => {
    return async (dispatch) => {
        const data = await updatePhoto(file)
            if (data.resultCode === 0) {
                dispatch(setPhoto(data.data.photos))
            }
    }
}
export default profileReducer