import React, { useEffect } from 'react'
import { ComponentType } from 'react';
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
import { postType, ProfileIdDataType, routerType, SelectedFile } from 'types/types';
import { appStateType } from 'Components/Redux/redux-store';
const ProfileContainer:React.FC<x> = (props) => {
    let {statusUserThunk,profileUserThunk} = props
    useEffect(()=>{
        let userId = props.router.params.userId
        if (!userId) userId = 27942
            profileUserThunk(userId)
            statusUserThunk(userId)
    },[props.router.params.userId,profileUserThunk,statusUserThunk ])
    return (
        <Profile {...props} />
    )
}

type mapStateToPropsType = {profileId:ProfileIdDataType|null,newPostText:string,postsList:postType[],status:string}
type mapDispatchToPropsType = {
    createActionChangePost:(text:string)=>void
    createActionAddPost:()=>void
    setProfileId:(data:ProfileIdDataType)=>void
    profileUserThunk:(id:number) =>void
    statusUserThunk:(id:number) =>void,
    updateStatusThunk:(status:string)=>void
    addPhoto: (file:SelectedFile) => void
    saveProfile: (data:ProfileIdDataType) => void

}
type y = {router: routerType}
type x = mapStateToPropsType & mapDispatchToPropsType & y 
let mapStateToProps = (state:appStateType):mapStateToPropsType=>{
    return {
        profileId: getProfileId(state),
        newPostText: getNewPostText(state),
        postsList: getPostsList(state),
        status: getStatus(state)

    }
}
type RouterProps = {
    router: routerType;
  };
  
  export function withRouter<T extends RouterProps>(
    Component: ComponentType<T>
  ): ComponentType<Omit<T, keyof RouterProps>> {
    return function ComponentWithRouterProp(props: Omit<T, keyof RouterProps>) {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();
      const router = { location, navigate, params };
      return <Component {...(props as T)} router={router} />;
    };
  }
  
  
  
  
export default compose(
    connect<mapStateToPropsType,mapDispatchToPropsType,y,appStateType>(mapStateToProps,{createActionChangePost,createActionAddPost,setProfileId,profileUserThunk,statusUserThunk,updateStatusThunk,addPhoto,saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
