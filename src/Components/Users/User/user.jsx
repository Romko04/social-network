import React from "react"
import './user.css'
import { Link } from 'react-router-dom'
const User = ({id,urlImg, city,country,followingProgress,following, followUserThunk, unFollowUserThunk,name}) => {
    let btn = React.createRef()
    return (
        <div className="user">
            <div className="user__content">
                <Link to={'/Profile/' + id}><img className="user__img" src={urlImg?urlImg : 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt="img" /></Link>
                <span className="user__name">{name}</span>
                <div className="user__residence">{country} {city}</div>
                {!following
                    ? <button disabled={followingProgress.some(uId => uId === id)} ref={btn} data-id={id} onClick={() => {
                        followUserThunk(id)
                    }} className="user__btn">Follow</button>
                    : <button disabled={followingProgress.some(uId => uId === id)} ref={btn} onClick={() => {
                        unFollowUserThunk(id)
                }} data-id={id} className="user__btn">Unfollow</button>}
            </div>
        </div>
    )
}
export default User