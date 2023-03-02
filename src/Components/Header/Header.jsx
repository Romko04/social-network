import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from '../../icons/logo.svg'
import './Header.css'
const Header = ({auth,profile}) => {
    return (
        <header className='header'>
            <div className="header__logo">
                <Link to={'/Profile/'} className='header__logo-link' >
                    <Logo className='header__logo-img'/>
                    <span className='header__logo-title'>SocialNet</span>
                </Link>
            </div>
            {auth.isAuth
            ?<div className='header__nav'>
                <span className="header__login-link">{auth.login}</span>
                {profile?<img className='header__photo' src={profile.photos.small} alt="photoUser" />:''}
            </div>
            :<span className="headel__login-link" >{auth.isAuth?auth.login: 'login' }</span>
            }
        </header>
    )
}
export default Header