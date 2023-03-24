import React from 'react'
import './Message.css'
const Message = ({ userName, photo, message }) => {
    return (
        <>
            <div className='message'>
                <div className="message__top">
                    <img className='message__img' src={photo || 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt="" />
                    <span className='message__user-name'>{userName}</span>
                </div>
                <div className='message__value'>{message}</div>
            </div>
        </>
    )
}
export default Message