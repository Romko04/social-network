import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from '../Redux/message-reducer'
import Message from './Message/Message'
import MessageForm from './Messages-Form'
import MessagesLoader from './Messages-loader'
import './Messages.css'
const Messages = () => {    
    const messages = useSelector((state) => state.dialogsPage.messages)
    const messagesAnchorRef = useRef()
    const dispatch = useDispatch()
    useEffect(()=>{
        messagesAnchorRef.current?.scrollIntoView(true)
    },[messages])
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])
    return (
        <div className='messages'>
            <div className='message__dialog'>
                <div className="dialog__messages">
                    {messages.length > 0 && messages.map((m, index) => <MessagesLoader key={index} {...m} />)}
                    <div ref={messagesAnchorRef}></div>
                </div>
                <MessageForm/>
            </div>
        </div>
    )
}
export default Messages
