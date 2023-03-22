import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from '../Redux/message-reducer'
import Message from './Message/Message'
import MessageForm from './Messages-Form'
import './Messages.css'
const Messages = ({ setMessages }) => {
    const messages = useSelector((state) => state.dialogsPage.messages)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())

        }
    }, [dispatch])
    // useEffect(() => {
    //     let ws
    //     const closeHandler = () => {
    //         setInterval(() => { createChannel() }, 3000);
    //     }
    //     function createChannel() {
    //         ws?.removeEventListener('close', closeHandler)
    //         ws?.close()
    //         ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    //         ws.addEventListener('close', closeHandler)
    //         setWsChannel(ws);
    //     }
    //     if (!wsChannel) {createChannel()}
    //     return () => {
    //         ws?.removeEventListener('close', closeHandler)
    //     }
    // }, [wsChannel]);
    // useEffect(() => {
    //     const messageHandler = (e)=>{setMessages(JSON.parse(e.data));}
    //     if (wsChannel) {
    //         wsChannel.addEventListener('message', messageHandler)
    //     }
    //     return () => {
    //         wsChannel?.removeEventListener('close', messageHandler)
    //     }
    // }, [wsChannel, setMessages])
    return (
        <div className='messages'>
            <div className='message__dialog'>
                <div className="dialog__messages">
                    {messages.length > 0 && messages.map((m, index) => <Message key={index} {...m} />)}
                </div>
                <MessageForm/>
            </div>
        </div>
    )
}
export default Messages
