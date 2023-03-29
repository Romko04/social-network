import React from "react"
import './user.css'
import { Link } from 'react-router-dom'
type propsUserType = {
    id:number
    urlImg:string
    followingProgress: number[]
    following:boolean
    followUserThunk:(id:number)=>void
    unFollowUserThunk:(id:number)=>void
    name:string
}
const User: React.FC<propsUserType> = ({id,urlImg,followingProgress,following, followUserThunk, unFollowUserThunk,name}) => {
    return (
        <div className="user">
            <div className="user__content">
                <Link to={'/Profile/' + id}><img className="user__img" src={urlImg} alt="img" /></Link>
                <span className="user__name">{name}</span>
                {!following
                    ? <button disabled={followingProgress?.some(uId => uId === id)} data-id={id} onClick={() => {
                        followUserThunk(id)
                    }} className="user__btn">Follow</button>
                    : <button disabled={followingProgress?.some(uId => uId === id)} onClick={() => {
                        unFollowUserThunk(id)
                }} data-id={id} className="user__btn">Unfollow</button>}
            </div>
        </div>
    )
}
export default User