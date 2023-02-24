import React from "react"
import './user.css'
import { NavLink } from 'react-router-dom'
const User = (props) => {
    let btn = React.createRef()
    return (
        <div className="user">
            <div className="user__content">
                <NavLink to={'/Profile/' + props.id}><img className="user__img" src={props.urlImg?props.urlImg : 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt="img" /></NavLink>
                <div className="user__name">{props.name}</div>
                <div className="user__residence">{props.country} {props.city}</div>
                {!props.following
                    ? <button disabled={props.followingProgress.some(id => id === props.id)} ref={btn} data-id={props.id} onClick={() => {
                        props.followUserThunk(props.id)
                    }} className="user__btn">Follow</button>
                    : <button disabled={props.followingProgress.some(id => id === props.id)} ref={btn} onClick={() => {
                        props.unFollowUserThunk(props.id)
                }} data-id={props.id} className="user__btn">Unfollow</button>}
            </div>
        </div>
    )
}
export default User