export const getUsers = (state) => {
    return state.usersPage.users
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const quiareIsFetching = (state) => {
    return state.usersPage.isFetching
}
export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getFollowinProgress = (state) => {
    return state.usersPage.followingProgres
}