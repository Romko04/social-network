import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message/Message'
import MessageForm from './Messages-Form'
import './Messages.css'
const Messages = ({ setMessages }) => {
    debugger
    const [wsChannel, setWsChannel] = useState(null);
    const messages = useSelector((state) => state.dialogsPage.messages)
    useEffect(() => {
        let ws
        const closeHandler = () => {
            setInterval(() => { createChannel() }, 3000);
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws);
        }
        if (!wsChannel) {createChannel()}
        return () => {
            ws?.removeEventListener('close', closeHandler)
        }
    }, [wsChannel]);
    useEffect(() => {
        const messageHandler = (e)=>{setMessages(JSON.parse(e.data));}
        if (wsChannel) {
            wsChannel.addEventListener('message', messageHandler)
        }
        return () => {
            wsChannel?.removeEventListener('close', messageHandler)
        }
    }, [wsChannel, setMessages])
    return (
        <div className='messages'>
            <div className='message__dialog'>
                <div className="dialog__messages">
                    {messages.length > 0 && messages.map((m, index) => <Message key={index} {...m} wsChannel={wsChannel} />)}
                </div>
                <MessageForm wsChannel={wsChannel} />
            </div>
        </div>
    )
}
export default Messages
