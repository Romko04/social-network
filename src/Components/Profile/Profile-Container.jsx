import React, { useEffect } from 'react'
import { createActionAddPost, createActionChangePost, setProfileId,profileUserThunk,statusUserThunk,updateStatusThunk,addPhoto, saveProfile } from '../Redux/profile-reducer'
import Profile from './Profile'
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getNewPostText, getPostsList, getProfileId, getStatus } from '../Redux/profile-selectors';
const ProfileContainer = (props) => {
    useEffect(()=>{
        let userId = props.router.params.userId
        if (!userId) userId = 27942
            props.profileUserThunk(userId)
            props.statusUserThunk(userId)
    },[])
    useEffect(()=>{
        let userId = props.router.params.userId
        if (!userId) userId = 27942
            props.profileUserThunk(userId)
            props.statusUserThunk(userId)
    },[props.router.params.userId])
    return (
        <Profile {...props} />
    )
}
let mapStateToProps = (state)=>{
    return {
        profileId: getProfileId(state),
        newPostText: getNewPostText(state),
        postsList: getPostsList(state),
        status: getStatus(state)
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        onChangeNewPost: (text)=> {
            dispatch(createActionChangePost(text))
        },
        onAddPost: ()=>{
            dispatch(createActionAddPost())
        },
        setProfileId: (data)=>{
            dispatch(setProfileId(data))
        },
        profileUserThunk: (id) => {
            dispatch(profileUserThunk(id))
        },
        statusUserThunk: (status) => {
            dispatch(statusUserThunk(status))
        },
        updateStatusThunk: (status) => {
            dispatch(updateStatusThunk(status))
        },
        addPhoto: (file) => {
            dispatch(addPhoto(file))
        },
        saveProfile: (data) => {
            dispatch(saveProfile(data))
        },
    }
}
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
