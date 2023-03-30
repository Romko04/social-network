import { appStateType } from './redux-store';
import { getStatusProfile, userProfileApi, updateStatusProfile, updatePhoto, safeProfileData } from "../../api/api"
import { ThunkAction } from 'redux-thunk';
import { photosType, ProfileIdDataType, resultCode } from 'types/types';

const add_post = 'ADDPOST'
const change_post = 'CHANGEPOST'
const set_profile_id = 'set_profile_id'
const set_user_status = 'setUserStatus'
const set_photo = 'setPhoto'

export type actionAddPostType = {
    type: typeof add_post
}
export type actionChangePostType = {
    type: typeof change_post
    message: string
}

export type actionSetProfileIdType = {
    type: typeof set_profile_id
    data: ProfileIdDataType
}
export type actionSetUserStatusType = {
    type: typeof set_user_status
    status: string
}
export type actionSetPhotoType = {
    type: typeof set_photo
    photos: photosType
}
export type postType = {
    likes: string, message: string, id:number
}
type actionsTypes = actionAddPostType|actionChangePostType|actionSetProfileIdType|actionSetUserStatusType|actionSetPhotoType
export const createActionAddPost = ():actionAddPostType => ({ type: add_post })
export const createActionChangePost = (text:string):actionChangePostType => {
    return {
        type: change_post,
        message: text
    }
}
export const setProfileId = (data:ProfileIdDataType ):actionSetProfileIdType => {
    return {
        type: set_profile_id,
        data
    }
}
export const setUserStatus = (status:string):actionSetUserStatusType => {
    return {
        type: set_user_status,
        status
    }
}
export const setPhoto = (photos:photosType):actionSetPhotoType => {
    return {
        type: set_photo,
        photos
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
const profileReducer = (state = initialState, action:actionsTypes):initialStateType => {
    switch (action.type) {
        case add_post: {
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
        case change_post: {
            return {
                ...state,
                newPostText: action.message
            }
        }
        case set_profile_id: {
            return {
                ...state,
                profileId: action.data
            }
        }
        case set_user_status: {
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
type thunkType = ThunkAction<Promise<void>,appStateType,unknown,actionsTypes>
export const profileUserThunk = (id:number):thunkType => {
    return async (dispatch) => {
       const data = await userProfileApi(id)
            dispatch(setProfileId(data))
    }
}
export const statusUserThunk = (id:number) => {
    return async (dispatch:any) => {
        const status = await getStatusProfile(id)
        dispatch(setUserStatus(status))
    }
}
export const updateStatusThunk= (status: string):thunkType => {
    return async (dispatch) => {
        const data = await updateStatusProfile(status)
            if (data.resultCode === resultCode.succes) {
                dispatch(setUserStatus(status))
            }
    }
}
export const addPhoto = (file:any):thunkType => {
    return async (dispatch) => {
        const data = await updatePhoto(file)
            if (data.resultCode === resultCode.succes) {
                dispatch(setPhoto(data.data.photos))
            }
    }
}
export const saveProfile = (res:any):thunkType => {
    return async (dispatch, getState) => {
        let userId = getState().auth.id
        const data = await safeProfileData(res)
            if (data.resultCode === resultCode.succes && userId) {
                dispatch(profileUserThunk(userId))
            }
    }
}
export default profileReducer