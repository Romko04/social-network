import { connect } from 'react-redux'
import {followingInProgress, getUsersThunk,followUserThunk,unFollowUserThunk, UserType, followingInProgressType } from '../Redux/users-reducer'
import Users from './Users'
import React, { useEffect } from "react"
import './Users.css'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getCurrentPage, getFollowinProgress, getPageSize, getTotalCount, getUsers, quiareIsFetching } from '../Redux/users-selectors'
import { appStateType } from 'Components/Redux/redux-store'
type mapStateToPropsType = {
    users: UserType[]
    pageSize: number
    isFetching:boolean
    totalCount:number
    currentPage:number
    followingProgres:number[]
}
type mapDispatchToPropsType = {
    getUsersThunk: (page:number, pageSize:number)=>void 
    followingInProgress: (isFetch:boolean, id:number) => followingInProgressType
    unFollowUserThunk: (userId: number) => void
    followUserThunk: (userId: number) => void
}
type UsersApiContainerType = mapStateToPropsType & mapDispatchToPropsType
const UsersApiContainer:React.FC<UsersApiContainerType> = ({currentPage,followingProgres,totalCount,pageSize,getUsersThunk, followingInProgress, followUserThunk,unFollowUserThunk}) => {
 useEffect(()=>{
        getUsersThunk(1, pageSize)
    },[getUsersThunk,pageSize])
    const onChangePage = (page:number) => {
        getUsersThunk(page, pageSize)
    }
    return (
        <div className='users'>
             {<Users followingProgress={followingProgres} onChangePage={onChangePage} {...{ currentPage, totalCount, pageSize, getUsersThunk, followingInProgress, followUserThunk, unFollowUserThunk }}/>}
        </div>
    )
}
let mapStateToProps = (state:appStateType):mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        isFetching: quiareIsFetching(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        followingProgres: getFollowinProgress(state),
    }
}
// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
export default compose<UsersApiContainerType>(
    withAuthRedirect,
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, appStateType>(mapStateToProps, {getUsersThunk, followingInProgress, followUserThunk,unFollowUserThunk})
)(UsersApiContainer)