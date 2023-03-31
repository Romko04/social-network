import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionsTypes, MessagesInitialStateType, message, startMessagesListening, stopMessagesListening } from '../Redux/message-reducer'
import Message from './Message/Message'
import MessageForm from './Messages-Form'
import MessagesLoader from './Messages-loader'
import './Messages.css'
import { appStateType } from 'Components/Redux/redux-store'
import { ThunkDispatch } from 'redux-thunk'
const Messages = () => {
    const {messages, status}:MessagesInitialStateType = useSelector((state:appStateType) => state.dialogsPage)
    const messagesEndRef = useRef(null);
    const dispatch:ThunkDispatch<appStateType,void,actionsTypes> = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])
    return (
        <div className='messages'>
            <div ref={messagesEndRef} className='message__dialog'>
                <div className="dialog__messages">
                    {status === 'ready'
                    ?messages.map((m, index) => <Message key={index} {...m} />)
                    :[...new Array(10)].map((_, i) => <MessagesLoader key={i} />)
                }
                </div>
                <MessageForm/>
            </div>
        </div>
    )
}
export default Messages
