import React from 'react'
import './Message.css'
const Message = ({ userName, photo, message }) => {
    return (
        <>
            <div>
                <img style={{width: '40px'}} src={photo} alt="photo" />
                <span>{userName}</span>
            </div>
            <div className='message'>{message}</div>
        </>
    )
}
export default Message