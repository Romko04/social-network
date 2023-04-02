import React from 'react'
import {ReactComponent as Profile} from '../../icons/profile.svg'
import {ReactComponent as Messages} from '../../icons/messages.svg'
import {ReactComponent as Users} from '../../icons/users.svg'
import {ReactComponent as Logout} from '../../icons/logout.svg'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { setUserTypeData } from 'types/types'
import { useSelector } from 'react-redux'
import { appStateType } from 'Components/Redux/redux-store'
export type navPropsType = {
    logoutThunk:()=>void,
    auth: setUserTypeData
}
const Nav:React.FC<navPropsType> = ({logoutThunk,auth}) => {
    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
    return (
        <nav className='nav'>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Profile">
                <Profile className='profile__icon'/> <span className="profile__nav-link-value">Profile</span>
            </NavLink>
            <NavLink className={({ isActive }) => isActive && isAuth? 'active nav__link' : 'nav__link'} to="/Messages">
                <Messages className='profile__icon'/> <span className="profile__nav-link-value">Messages</span>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Users">
                <Users className='profile__icon'/> <span className="profile__nav-link-value">Users</span>
            </NavLink>
            {auth&&<button className='nav__link logout' onClick={logoutThunk}>
                <Logout className='profile__icon'/> <span className="profile__nav-link-value">Logout</span>
            </button>}
        </nav>
    )
}
export default Nav