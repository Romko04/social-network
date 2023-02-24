import React from 'react'
import './Header.css'
const Header = (props) => {
    return (
        <header className='header'>
            <img className='header__img' src="https://th.bing.com/th/id/OIP.JqFZCSNoNnAKCqj1C4m4ewHaHd?w=164&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" />
            {props.auth.isAuth
            ?<div className='header__nav'>
                <span className="headel__login-link">{props.auth.login}</span>
                <button onClick={props.logoutThunk}>Logout</button>
            </div>
            :<span className="headel__login-link" >{props.auth.isAuth?props.auth.login: 'login' }</span>
            }
        </header>
    )
}
export default Header