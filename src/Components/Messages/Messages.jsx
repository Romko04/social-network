import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message/Message'
import MessageForm from './Messages-Form'
import './Messages.css'
let wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
const Messages = ({setMessages}) => {
    const chatRef = useRef(null);
    if (chatRef) {
        debugger
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    const messages = useSelector((state) => state.dialogsPage.messages)
    useEffect(()=>{
        wsChannel.addEventListener('message', (e)=>{
            setMessages(JSON.parse(e.data))
        })
    },[setMessages])
    return (
        <div className='messages'>
            <div className='message__dialog' ref={chatRef}>
                <div className="dialog__messages">
                    {messages.length > 0 && messages.map(m => <Message key={m.id} {...m} />)}
                </div>
                <MessageForm wsChannel={wsChannel}/>
            </div>
        </div>
    )
}
export default Messages
