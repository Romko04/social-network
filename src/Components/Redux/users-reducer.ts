import { resultCode } from './../../types/types';
import { UserType } from '../../types/types';
import { followApi, getUsers, unFollowApi } from "../../api/api"
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { appStateType } from './redux-store';

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
export type actionsTypes = unFollowUserType|onFollowUserType|setUsersType|setTotalCountType|setCurrentPageType|toggleFetchingType|followingInProgressType
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
const usersRegucer = (state = initialState, action: actionsTypes):initialStateType => {
    switch (action.type) {
        case follow_User: {
            return userFolowwing(state, action, true)
        }
        case un_Follow_User: {
            return userFolowwing(state, action, false)
        }
        case set_users: {
            return {...state, users: [...action.users]}
        }
        case set_total_count: {
            return {...state, totalCount: action.count}
        }
        case set_current_page: {
            return {...state, currentPage: action.currentPage}
        }
        case toggle_fetching: {
            return {...state, isFetching: action.isFetch}
        }
        case following_in_progress: {
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
type thunkType = ThunkAction<void,appStateType,unknown,actionsTypes>
export const getUsersThunk = (page:number, pageSize:number):thunkType => {
    return (dispatch) => {
        dispatch(toggleFetching(true))
        dispatch(setCurrentPage(page))
        getUsers(page, pageSize).then((data) => {
            dispatch(setTotalCount(data.totalCount))
            dispatch(setUsers(data.items))
            dispatch(toggleFetching(false))
        })
    }
}
export const followUserThunk = (id:number):thunkType => {
    return (dispatch) => {
       followUnfollowFlow(dispatch,id,followApi,onFollowUser)

    }
}
export const unFollowUserThunk = (id:number):thunkType => {
    return (dispatch) => {
        followUnfollowFlow(dispatch,id,unFollowApi,unFollowUser)
    }
}
type followApiType = typeof followApi
type unfollowApiType = typeof unFollowApi
export default usersRegucer
const followUnfollowFlow = async (dispatch:Dispatch<actionsTypes>, id:number, methodApi:followApiType|unfollowApiType , action:(id:number)=>onFollowUserType|unFollowUserType) => {
    dispatch(followingInProgress(true, id))
    const data = await methodApi(id)
    dispatch(followingInProgress(false, id))
    if (data.resultCode === resultCode.succes) {
        dispatch(action(id))
    }
}
const userFolowwing = (state:initialStateType, action:onFollowUserType|unFollowUserType, followed:boolean) => ({
    ...state,
    users: state.users.map((u:UserType) => {
        if (u.id === action.id) return {...u, followed}
        return u
    })
})