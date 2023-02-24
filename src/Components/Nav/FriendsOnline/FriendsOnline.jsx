import React from 'react'
import FriendOnline from './FriendOnline/FriendOnline'
import './FriendsOnline.css'
const FriendsOnline = (props) => {
    let friends = props.data.map(friend => <FriendOnline key={friend.id} id={friend.id} urlImg={friend.urlImg}/>)
    return (
        <div className='friends'>
            <h1 className='friens__title'>Friends Online</h1>
            {friends}
        </div>
    )
}
export default FriendsOnline