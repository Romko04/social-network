import React from 'react'
import { NavLink } from 'react-router-dom'
import {ReactComponent as Logo} from '../../icons/logo.svg'
import './Header.css'
const Header = ({auth,photoUser}) => {
    return (
        <header className='header'>
            <div className="header__logo">
                <NavLink to={'/Profile/'} className='header__logo-link' >
                    <Logo className='header__logo-img'/>
                    <span className='header__logo-title'>SocialNet</span>
                </NavLink>
            </div>
            {auth.isAuth
            ?<div className='header__nav'>
                <span className="header__login-link">{auth.login}</span>
                {photoUser?<img className='header__photo' src={photoUser.photos.small} alt="photoUser" />:''}
            </div>
            :<span className="headel__login-link" >{auth.isAuth?auth.login: 'login' }</span>
            }
        </header>
    )
}
export default Header