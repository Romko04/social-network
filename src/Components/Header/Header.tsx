import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileIdDataType, setUserTypeData } from 'types/types'
import {ReactComponent as Logo} from '../../icons/logo.svg'
import './Header.css'
import { useSelector } from 'react-redux'
import { appStateType } from 'Components/Redux/redux-store'
export type HeaderPropsType = {auth:setUserTypeData|null,profile:ProfileIdDataType|null}
const Header:React.FC<HeaderPropsType> = ({auth,profile}) => {
    const [imageUrl, setImageUrl] = useState<null|string>(null);
    let id = useSelector((state:appStateType)=>state.auth.id)
    useEffect(()=>{
        if (profile?.userId === id) {
            if (profile.photos.small === null) {
                setImageUrl('https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0')
            } else {
                setImageUrl(profile.photos.small)
            }
          }
    },[id, profile])
    return (
        <header className='header'>
            <div className="header__logo">
                <Link to={'/Profile/'} className='header__logo-link' >
                    <Logo className='header__logo-img'/>
                    <span className='header__logo-title'>SocialNet</span>
                </Link>
            </div>
            {auth?.isAuth
            ?<div className='header__nav'>
                <span className="header__login-link">{auth.login}</span>
                {imageUrl?<img className='header__photo' src={imageUrl} alt="photoUser" />:''}
            </div>
            :<span className="header__login-link" >{auth?.isAuth?auth.login: <span className="header__login-link" >Login</span> }</span>
            }
        </header>
    )
}
export default Header