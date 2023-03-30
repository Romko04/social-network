import { appStateType } from "./redux-store"

export const getProfileId = (state:appStateType) => {
    return state.profilePage.profileId
}
export const getNewPostText = (state:appStateType) => {
    return state.profilePage.newPostText
}
export const getPostsList = (state:appStateType) => {
    return state.profilePage.postsList
}
export const getStatus = (state:appStateType) => {
    return state.profilePage.status
}
