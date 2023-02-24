import React from 'react'
import './FriendOnline.css'
const FriendOnline = (props) => {
    return (
        <div className='friends__item'>
            <img className={'friends__item-img'} src={props.urlImg} alt="" />
        </div>
    )
}
export default FriendOnline