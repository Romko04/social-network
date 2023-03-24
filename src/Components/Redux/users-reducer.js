import { followApi, getUsers, unFollowApi } from "../../api/api"

const follow_User = 'followUser'
const un_Follow_User = 'unFollowUser'
const set_users = 'SetUsers'
const set_total_count = 'set_total_count'
const set_current_page = 'set_current_page'
const toggle_fetching = 'toggle_fetching'
const following_in_progress = 'following_in_progress'
export const onFollowUser = (id) => {
    return {
        type: follow_User,
        id: id
    }
}
export const unFollowUser = (id) => {
    return {
        type: un_Follow_User,
        id: id
    }
} 
export const setUsers = (users) => {
    return {
        type: set_users,
        users: users
    }
}
export const setTotalCount = (count) => {
    return {
        type: set_total_count,
        count: count
    }
}
export const setCurrentPage = (count) => {
    return {
        type: set_current_page,
        currentPage: count
    }
}
export const toggleFetching= (isFetch) => {
    return {
        type: toggle_fetching,
        isFetch: isFetch
    }
}
export const followingInProgress= (isFetch, id) => {
    return {
        type: following_in_progress,
        isFetch: isFetch,
        id: id
    }
}

let initialState = {
    users: [
    ],
    totalCount: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: true,
    followed: false,
    followingProgres: []
}
const usersRegucer = (state = initialState, action) => {
    switch (action.type) {
        case 'followUser': {
            return userFolowwing(state, action, true)
        }
        case 'unFollowUser': {
            return userFolowwing(state, action, false)
        }
        case 'SetUsers': {
            return {...state, users: [...action.users]}
        }
        case 'set_total_count': {
            return {...state, totalCount: action.count}
        }
        case 'set_current_page': {
            return {...state, currentPage: action.currentPage}
        }
        case 'toggle_fetching': {
            return {...state, isFetching: action.isFetch}
        }
        case 'following_in_progress': {
            return {
                ...state,
                followingProgres: action.isFetch
                ? [...state.followingProgres, action.id]
                : state.followingProgres.filter((id => id !== action.id))
            }
        }
        default:
            return state
    }
}
export const getUsersThunk = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleFetching(true))
        dispatch(setCurrentPage(page))
        getUsers(page, pageSize).then(data => {
            dispatch(setTotalCount(data.totalCount))
            dispatch(setUsers(data.items))
            dispatch(toggleFetching(false))
        })
    }
}
export const followUserThunk = (id) => {
    return (dispatch) => {
       followUnfollowFlow(dispatch,id,followApi,onFollowUser)

    }
}
export const unFollowUserThunk = (id) => {
    return (dispatch) => {
        followUnfollowFlow(dispatch,id,unFollowApi,unFollowUser)
    }
}
export default usersRegucer
const followUnfollowFlow = async (dispatch, id, methodApi, action) => {
    dispatch(followingInProgress(true, id))
    const data = await methodApi(id)
    dispatch(followingInProgress(false, id))
    if (data.resultCode === 0) {
        dispatch(action(id))
    }
}
const userFolowwing = (state, action, followed) => ({
    ...state,
    users: state.users.map(u => {
        if (u.id === action.id) return {...u, followed}
        return u
    })
})