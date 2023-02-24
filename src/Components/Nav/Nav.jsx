import React from 'react'
import { NavLink } from 'react-router-dom'
import FriendsOnline from './FriendsOnline/FriendsOnline'
import './Nav.css'
const Nav = (props) => {
    return (
        <nav className='nav'>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Profile">Profile</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Messages">Messages</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Users">Users</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/News">News</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Music">Music</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active nav__link' : 'nav__link'} to="/Settings">Settings</NavLink>
            <FriendsOnline data={props.data.friendsOnline} />
        </nav>
    )
}
export default Nav