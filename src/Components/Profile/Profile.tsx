import React, { useEffect, useState } from 'react'
import Preloader from '../common/Preloader'
import Posts from './Posts/Posts'
import Bacground from '../../img/backphone.jpg'
import { ReactComponent as Upload } from '../../icons/uploadphoto.svg'
import './Profile.css'
import ProfileData from './ProfileData/ProfileData'
import ProfileDataForm, { saveProfileDataType } from './ProfileData/ProfileDataForm'
import ProfileStatus from './ProfileInfo/ProfileStatus'
import { postType, ProfileIdDataType, routerType, SelectedFile } from 'types/types'
type ProfilePropsType = {
    profileId:ProfileIdDataType|null
    router: routerType
    status:string
    updateStatusThunk:(status:string)=>void
    newPostText:string
    postsList:postType[]
    saveProfile:(data:saveProfileDataType)=>void
    createActionChangePost:(text:string)=>void
    createActionAddPost:()=>void
    addPhoto:(file:SelectedFile)=>void

}
const Profile:React.FC<ProfilePropsType> = ({profileId,router,status,updateStatusThunk,newPostText,postsList,saveProfile,createActionChangePost,createActionAddPost,addPhoto}) => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    let [edit, setEdit] = useState(false)
    const changeNewPost = (e:any) => {
        createActionChangePost(e.target.value)
    }
    const addPost = () => {
        createActionAddPost()
    }
    const onAddPhoto:React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            console.log(event.target.files[0]);
            
            addPhoto(event.target.files[0]);
          }
    }
    if (!profileId) {
        return <Preloader />
    }
    return (
        <div className='profile'>
            <div className='profile__backgroung'>
                <img className='profile__backgroung-img' src={Bacground} alt="" />
            </div>
            <div className="profile__description">
                <div className="profile__desctiption-data">
                    <div className="profile__user-photo-content">
                        <img className='profile__user-photo' src={profileId.photos.large || 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt="" />
                        {!router.params.userId && <label className='upload__photo'><Upload className='profile__upload-svg' /><input className='profile__upload-photo' onChange={onAddPhoto} type="file" name="" id="" /></label>}
                    </div>
                    <h1 className='profile__user-name'>{profileId.fullName}</h1>
                    <ProfileStatus userId={router.params.userId} status={status} updateStatusThunk={updateStatusThunk} />
                </div>
            </div>
            <div className="profile__content">
                {edit ? <ProfileDataForm saveProfile={saveProfile} setEdit={setEdit} profileId={profileId} /> : <ProfileData router={router} profileId={profileId} setEdit={setEdit} />}
                     <div className='profile__posts'>
                        {!router.params.userId
                            ?<div>
                                <div className='profile__posts-add'>
                                <input className='profile__post-input' onChange={changeNewPost} value={newPostText}></input>
                                <button className='profile__post-btn' onClick={addPost}>Add Post</button>
                            </div>
                            <Posts img={profileId.photos.small} data={postsList} />
                            </div>
                            : <h3 className='posts__none'> No Posts</h3>
                        }
                        
                    </div>
            </div>
        </div>
    )
}

export default Profile