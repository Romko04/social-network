import React from 'react'
import Dialog from './Dialogs/Dialogs'
import Message from './Message/Message'
import './Messages.css'

const Messages = (props) => {
    let textMessage = React.createRef()
    const changeMessage = () => {
        props.onChangeMessage(textMessage.current.value)
    }
    const addMessage = () => {props.onAddMessage()}
    let people = props.dialogsPage.usersDialogs.map(p => <Dialog key={p.id} id={p.id} name={p.name} url={p.urlImg} />)
    let dialogPeople = props.dialogsPage.dailog.map(m => <Message key={m.id} message={m.message} />)
    return (
        <div className='messages'>
            <div className='messages__dialogs'>
                {people}
            </div>
            <div className='message__dialog'>
                <div className="dialog__messages">
                    {dialogPeople}
                </div>
                <div className="submit__messages">
                    <textarea value={props.dialogsPage.newMessage} ref={textMessage} onChange={changeMessage} className='dialog__messages-textarea' name="" id="" cols="10" rows="4"></textarea>
                    <button onClick={addMessage} className="dialog__messages-btn">Відправити</button>
                </div>
            </div>
        </div>
    )
}
export default Messages
