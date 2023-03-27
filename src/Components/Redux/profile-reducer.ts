import { message } from './message-reducer';
import { getStatusProfile, userProfileApi, updateStatusProfile, updatePhoto, safeProfileData } from "../../api/api"

const add_post = 'ADDPOST'
const change_post = 'CHANGEPOST'
const set_profile_id = 'set_profile_id'
const set_user_status = 'setUserStatus'
const set_photo = 'setPhoto'

export type createActionAddPostType = {
    type: typeof add_post
}
export type createActionChangePostType = {
    type: typeof change_post
    message: string
}
export type photosType = {
    large: string|null
    small: string|null
}
export type contactsType = {
    facebook: string|null
    github: string|null
    instagram: string|null
    mainLink: string|null
    twitter: string|null
    vk: string|null
    website: string|null
    youtube: string|null

}
export type ProfileIdDataType = {
    aboutMe: string
    contacts: contactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: photosType
    userId: number
}
export type setProfileIdType = {
    type: typeof set_profile_id
    data: ProfileIdDataType
}
export type setUserStatusType = {
    type: typeof set_user_status
    status: string
}
export type setPhotoType = {
    type: typeof set_photo
    photos: string
}
export type postType = {
    likes: string, message: string, id:number
}
export const createActionAddPost = ():createActionAddPostType => ({ type: add_post })
export const createActionChangePost = (text:string):createActionChangePostType => {
    return {
        type: change_post,
        message: text
    }
}
export const setProfileId = (data:ProfileIdDataType ):setProfileIdType => {
    return {
        type: set_profile_id,
        data
    }
}
export const setUserStatus = (status:string):setUserStatusType => {
    return {
        type: set_user_status,
        status
    }
}
export const setPhoto = (url:string):setPhotoType => {
    return {
        type: set_photo,
        photos: url
    }
}
let initialState = {
    postsList: [
        { likes: '5', message: 'Hello World', id:1 },
        { likes: '3', message: 'How are you', id:2 },
        { likes: '8', message: 'Hy', id: 3 },
        { likes: '4', message: 'Hey Mister',id:4 }
    ],
    newPostText: '',
    profileId: null as ProfileIdDataType|null,
    status: ''
}
export type initialStateType = typeof initialState
const profileReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case 'ADDPOST': {
            const newPost = {
                likes: '6',
                message: state.newPostText,
                id: 10
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
            return {
                ...state,
                profileId: {...state.profileId, photos: action.photos} as ProfileIdDataType
            }
        }
        default:
            return state
    }
}
export const profileUserThunk = (id:number) => {
    return async (dispatch:any) => {
       const data = await userProfileApi(id)
            dispatch(setProfileId(data))
    }
}
export const statusUserThunk = (id) => {
    return async (dispatch:any) => {
        const status = await getStatusProfile(id)
        dispatch(setUserStatus(status))
    }
}
export const updateStatusThunk= (status) => {
    return async (dispatch:any) => {
        const data = await updateStatusProfile(status)
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
    }
}
export const addPhoto = (file:any) => {
    return async (dispatch:any) => {
        const data = await updatePhoto(file)
            if (data.resultCode === 0) {
                dispatch(setPhoto(data.data.photos))
            }
    }
}
export const saveProfile = (res:any) => {
    return async (dispatch, getState) => {
        let userId = getState().auth.id
        const data = await safeProfileData(res)
            if (data.resultCode === 0) {
                dispatch(profileUserThunk(userId))
            }
    }
}
export default profileReducer