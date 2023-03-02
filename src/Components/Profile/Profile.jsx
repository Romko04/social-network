import React, { useState } from 'react'
import Preloader from '../common/Preloader'
import Posts from './Posts/Posts'
import Bacground from '../../img/backphone.jpg'
import { ReactComponent as Upload } from '../../icons/uploadphoto.svg'
import './Profile.css'
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
        <div className='profile'>
            <div className='profile__backgroung'>
                <img className='profile__backgroung-img' src={Bacground} alt="" />
            </div>
            <div className="profile__description">
                <div className="profile__desctiption-data">
                    <img className='profile__user-photo' src={props.profileId.photos.large || 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt="" />
                    {!props.router.params.userId && <label><Upload className='profile__upload-svg' /><input className='profile__upload-photo' onChange={onAddPhoto} type="file" name="" id="" /></label>}
                    <h1 className='profile__user-name'>{props.profileId.fullName}</h1>
                    <ProfileStatus userId={props.router.params.userId} status={props.status} updateStatusThunk={props.updateStatusThunk} />
                </div>
            </div>
            <div className="profile__content">
                {edit ? <ProfileDataForm saveProfile={props.saveProfile} setEdit={setEdit} profileId={props.profileId} /> : <ProfileData router={props.router} profileId={props.profileId} setEdit={setEdit} />}
                     <div className='profile__posts'>
                        {!props.router.params.userId
                            ?<div>
                                <div className='profile__posts-add'>
                                <input className='profile__post-input' onChange={changeNewPost} value={props.newPostText} ref={textPost}></input>
                                <button className='profile__post-btn' onClick={addPost}>Add Post</button>
                            </div>
                            <Posts img={props.profileId.photos.small} data={props.postsList} />
                            </div>
                            : <h3 className='posts__none'> No Posts</h3>
                        }
                        
                    </div>
            </div>
        </div>
    )
}

export default Profile