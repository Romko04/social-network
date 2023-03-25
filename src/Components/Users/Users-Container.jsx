import { connect } from 'react-redux'
import { onFollowUser,unFollowUser,followingInProgress, getUsersThunk,followUserThunk,unFollowUserThunk } from '../Redux/users-reducer'
import Users from './Users'
import React, { useEffect } from "react"
import './Users.css'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getCurrentPage, getFollowinProgress, getPageSize, getTotalCount, getUsers, quiareIsFetching } from '../Redux/users-selectors'
const UsersApiContainer = (props) => {
    const {getUsersThunk, pageSize} = props
    useEffect(()=>{
        getUsersThunk(1, pageSize)
    },[getUsersThunk,pageSize])
    const onChangePage = (page) => {
        props.getUsersThunk(page, props.pageSize)
    }
    return (
        <div className='users'>
             {<Users onChangePage={onChangePage} {...props} />}
        </div>
    )
}
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        isFetching: quiareIsFetching(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        followingProgres: getFollowinProgress(state),
    }
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {onFollowUser,unFollowUser,getUsersThunk, followingInProgress, followUserThunk,unFollowUserThunk})
)(UsersApiContainer)