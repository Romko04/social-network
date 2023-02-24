import React from 'react'
import './Message.css'
const Message = (Props) => {
    return (
        <div className='message'>{Props.message}</div>
    )
}
export default Message