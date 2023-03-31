import { connect } from 'react-redux'
import { followingInProgress, getUsersThunk, followUserThunk, unFollowUserThunk, followingInProgressType } from '../Redux/users-reducer'
import Users from './Users'
import React, { useEffect } from "react"
import './Users.css'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getCurrentPage, getFollowinProgress, getPageSize, getTotalCount, getUsers, quiareIsFetching } from '../Redux/users-selectors'
import { appStateType } from 'Components/Redux/redux-store'
import { UserType } from 'types/types'

type mapStateToPropsType = {
    users: UserType[]
    pageSize: number
    isFetching: boolean
    totalCount: number
    currentPage: number
    followingProgress: number[]
}

type mapDispatchToPropsType = {
    getUsersThunk: (page:number, pageSize:number) => void 
    followingInProgress: (isFetch:boolean, id:number) => followingInProgressType
    unFollowUserThunk: (userId: number) => void
    followUserThunk: (userId: number) => void
}

type UsersApiContainerType = mapStateToPropsType & mapDispatchToPropsType

const UsersApiContainer: React.FC<UsersApiContainerType> = ({
  currentPage,
  followingProgress,
  totalCount,
  pageSize,
  getUsersThunk,
  followingInProgress,
  followUserThunk,
  unFollowUserThunk
}) => {
  useEffect(() => {
    getUsersThunk(1, pageSize)
  }, [getUsersThunk, pageSize])

  const onChangePage = (page: number) => {
    getUsersThunk(page, pageSize)
  }

  return (
    <div className='users'>
      {<Users followingProgress={followingProgress} onChangePage={onChangePage} {...{ currentPage, totalCount, pageSize, getUsersThunk, followingInProgress, followUserThunk, unFollowUserThunk }} />}
    </div>
  )
}

let mapStateToProps = (state: appStateType): mapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    isFetching: quiareIsFetching(state),
    totalCount: getTotalCount(state),
    currentPage: getCurrentPage(state),
    followingProgress: getFollowinProgress(state),
  }
}

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect<mapStateToPropsType,mapDispatchToPropsType,{},appStateType>(mapStateToProps, { getUsersThunk, followingInProgress, followUserThunk, unFollowUserThunk } as mapDispatchToPropsType)
)(UsersApiContainer)
