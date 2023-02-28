import React from 'react'
import {ReactComponent as Profile} from '../../icons/profile.svg'
import {ReactComponent as Messages} from '../../icons/messages.svg'
import {ReactComponent as Users} from '../../icons/users.svg'
import {ReactComponent as Logout} from '../../icons/logout.svg'
import { NavLink } from 'react-router-dom'
import FriendsOnline from './FriendsOnline/FriendsOnline'
import './Nav.css'
const Nav = (props) => {
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
            {props.auth&&<button className='nav__link logout' onClick={props.logoutThunk}>
                <Logout className='profile__icon'/> Logout
            </button>}
            {/* <FriendsOnline data={props.sideBar.friendsOnline} /> */}
        </nav>
    )
}
export default Nav