import { appStateType } from "./redux-store"

export const getUsers = (state:appStateType) => {
    return state.usersPage.users
}
export const getPageSize = (state:appStateType) => {
    return state.usersPage.pageSize
}
export const quiareIsFetching = (state:appStateType) => {
    return state.usersPage.isFetching
}
export const getTotalCount = (state:appStateType) => {
    return state.usersPage.totalCount
}
export const getCurrentPage = (state:appStateType) => {
    return state.usersPage.currentPage
}
export const getFollowinProgress = (state:appStateType) => {
    return state.usersPage.followingProgres
}