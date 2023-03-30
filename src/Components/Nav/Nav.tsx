import React from 'react'
import {ReactComponent as Profile} from '../../icons/profile.svg'
import {ReactComponent as Messages} from '../../icons/messages.svg'
import {ReactComponent as Users} from '../../icons/users.svg'
import {ReactComponent as Logout} from '../../icons/logout.svg'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { setUserTypeData } from 'types/types'
export type navPropsType = {
    logoutThunk:()=>void,
    auth: setUserTypeData
}
const Nav:React.FC<navPropsType> = ({logoutThunk,auth}) => {
    return (
        <nav className='nav'>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Profile">
                <Profile className='profile__icon'/> Profile
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Messages">
                <Messages className='profile__icon'/> Messages
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Users">
                <Users className='profile__icon'/> Users
            </NavLink>
            {auth&&<button className='nav__link logout' onClick={logoutThunk}>
                <Logout className='profile__icon'/> Logout
            </button>}
        </nav>
    )
}
export default Nav