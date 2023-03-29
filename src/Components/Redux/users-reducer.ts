import { photosType } from './profile-reducer';
import { followApi, getUsers, unFollowApi } from "../../api/api"

const follow_User = 'followUser'
const un_Follow_User = 'unFollowUser'
const set_users = 'SetUsers'
const set_total_count = 'set_total_count'
const set_current_page = 'set_current_page'
const toggle_fetching = 'toggle_fetching'
const following_in_progress = 'following_in_progress'
export type onFollowUserType = {
    type: typeof follow_User
    id: number
}
export type unFollowUserType = {
    type: typeof un_Follow_User
    id: number
}
export type UserType = {
    name: string
    id: number
    photos: photosType
    status: string | null
    followed: boolean
}
export type setUsersType = {
    type: typeof set_users
    users: UserType[]
}
export type setTotalCountType = {
    type: typeof set_total_count
    count:number
}
export type setCurrentPageType = {
    type: typeof set_current_page
    currentPage:number
}
export type toggleFetchingType = {
    type: typeof toggle_fetching
    isFetch:boolean
}
export type followingInProgressType = {
    type: typeof following_in_progress
    isFetch:boolean
    id:number
}
export type initialStateType = {
    users: UserType[]
    totalCount: number,
    pageSize: number
    currentPage:number
    isFetching:boolean
    followed: boolean
    followingProgres: number[]
}
export const onFollowUser = (id:number):onFollowUserType => {
    return {
        type: follow_User,
        id: id
    }
}

export const unFollowUser = (id:number):unFollowUserType => {
    return {
        type: un_Follow_User,
        id: id
    }
} 
export const setUsers = (users:UserType[]):setUsersType => {
    return {
        type: set_users,
        users: users
    }
}
export const setTotalCount = (count:number):setTotalCountType => {
    return {
        type: set_total_count,
        count
    }
}
export const setCurrentPage = (count:number):setCurrentPageType => {
    return {
        type: set_current_page,
        currentPage: count
    }
}
export const toggleFetching= (isFetch:boolean):toggleFetchingType => {
    return {
        type: toggle_fetching,
        isFetch
    }
}
export const followingInProgress= (isFetch:boolean, id:number):followingInProgressType => {
    return {
        type: following_in_progress,
        isFetch: isFetch,
        id: id
    }
}

let initialState:initialStateType = {
    users: [
    ],
    totalCount: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: true,
    followed: false,
    followingProgres: []
}
const usersRegucer = (state = initialState, action: any):initialStateType => {
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
                : state.followingProgres.filter((id:number) => id !== action.id)
            }
        }
        default:
            return state
    }
}
export const getUsersThunk = (page:number, pageSize:number) => {
    return (dispatch:any) => {
        dispatch(toggleFetching(true))
        dispatch(setCurrentPage(page))
        getUsers(page, pageSize).then((data:any) => {
            dispatch(setTotalCount(data.totalCount))
            dispatch(setUsers(data.items))
            dispatch(toggleFetching(false))
        })
    }
}
export const followUserThunk = (id:number) => {
    return (dispatch:any) => {
       followUnfollowFlow(dispatch,id,followApi,onFollowUser)

    }
}
export const unFollowUserThunk = (id:number) => {
    return (dispatch:any) => {
        followUnfollowFlow(dispatch,id,unFollowApi,unFollowUser)
    }
}
export default usersRegucer
const followUnfollowFlow = async (dispatch:any, id:number, methodApi:any, action:any) => {
    dispatch(followingInProgress(true, id))
    const data = await methodApi(id)
    dispatch(followingInProgress(false, id))
    if (data.resultCode === 0) {
        dispatch(action(id))
    }
}
const userFolowwing = (state:any, action:any, followed:boolean) => ({
    ...state,
    users: state.users.map((u:UserType) => {
        if (u.id === action.id) return {...u, followed}
        return u
    })
})