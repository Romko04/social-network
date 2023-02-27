import React, { useState } from 'react'
import Preloader from '../common/Preloader'
import Posts from './Posts/Posts'
import'./Profile.css'
import { ProfileData } from './ProfileData/ProfileData'
import ProfileDataForm from './ProfileData/ProfileDataForm'
import ProfileStatus from './ProfileInfo/ProfileStatus'

const Profile = (props) => {
    let [edit, setEdit] = useState(false)
    const textPost = React.createRef()
    const changeNewPost = () => {
        props.onChangeNewPost(textPost.current.value)
    }
    const addPost = () => {
        props.onAddPost()
    }
    const onAddPhoto = (e) => {
        props.addPhoto(e.target.files[0])
    }
    if (!props.profileId) {
        return <Preloader />
    }
    return (
        <div className='content'>
            <div className="profile__description">
                <img src={props.profileId.photos.large || 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt="" />
                {!props.router.params.userId&& <input onChange={onAddPhoto} type="file" name="" id="" />}
                <ProfileStatus userId={props.router.params.userId} status={props.status} updateStatusThunk={props.updateStatusThunk} />
            </div>
            {edit?<ProfileDataForm saveProfile={props.saveProfile} setEdit={setEdit} profileId={props.profileId} /> :<ProfileData profileId={props.profileId} setEdit={setEdit}/> }
            <div>
                <textarea className='content__post' onChange={changeNewPost} value={props.newPostText} ref={textPost}></textarea>
                <div className=""><button className='content__post-btn' onClick={addPost}>Add Post</button></div>
                <Posts data={props.postsList} />
            </div>
        </div>
    )
}

export default Profile