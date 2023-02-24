import React from 'react'
import Preloader from '../common/Preloader'
import Posts from './Posts/Posts'
import'./Profile.css'
import ProfileStatus from './ProfileInfo/ProfileStatus'

const Profile = (props) => {
    let textPost = React.createRef()
    let changeNewPost = () => {
        props.onChangeNewPost(textPost.current.value)
    }
    let addPost = () => {
        props.onAddPost()
    }
    if (!props.profileId) {
        return <Preloader />
    }
    return (
        <div className='content'>
            <div className="profile__description">
                <img src={props.profileId.photos.small} alt="" />
                <ProfileStatus status={props.status} updateStatusThunk={props.updateStatusThunk} />
            </div>
            <div>
                <textarea className='content__post' onChange={changeNewPost} value={props.newPostText} ref={textPost}></textarea>
                <div className=""><button className='content__post-btn' onClick={addPost}>Add Post</button></div>
                <Posts data={props.postsList} />
            </div>
        </div>
    )
}
export default Profile