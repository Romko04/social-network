import React from 'react'
import { NavLink } from 'react-router-dom'
import './Dialogs.css'
const Dialog = (Props) => {
    let path = /Messages/ + '' + Props.id
    return (
        <div className='dialogs'>
            <img src={Props.url} alt="" className='dialog__img' />
            <NavLink className={({ isActive }) => isActive ? 'dialog__active' : 'messages__dialogs-link'} to={path}>{Props.name}</NavLink>
        </div>
    )
}
export default Dialog