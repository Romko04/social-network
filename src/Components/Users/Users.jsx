import React from "react"
import { useSelector } from "react-redux"
import Pagination from "./Pagination/Pagination"
import User from "./User/user"
import UserLoader from "./User/User-loader/User-loader"
import './Users.css'
const Users = (props) => {
    
     let {users, isFetching} = useSelector(state=> state.usersPage)
    return (
        <div className="users">
            <div className="pagination">
                <Pagination {...props}/>
            </div>
            <div className="users__items">
                <div className="users__item">
                    {isFetching?[...new Array(15)].map((_, i)=> <UserLoader key={i} /> )
                    :users.map(u => <User key={u.id} unFollowUserThunk={props.unFollowUserThunk} followUserThunk={props.followUserThunk} followingProgress={props.followingProgres} followingInProgress= {props.followingInProgress} onFollowUser={props.onFollowUser} unFollowUser={props.unFollowUser} following={u.followed} id={u.id} urlImg={u.photos.small} name={u.name} country={u.country} city={u.city} />)}
                </div>
            </div>
        </div>
    )
}
export default Users