import React from "react"
import Pagination from "./Pagination/Pagination"
import User from "./User/user"
import './Users.css'
const Users = (props) => {
     let userList = props.users.map(u => <User key={u.id} unFollowUserThunk={props.unFollowUserThunk} followUserThunk={props.followUserThunk} followingProgress={props.followingProgres} followingInProgress= {props.followingInProgress} onFollowUser={props.onFollowUser} unFollowUser={props.unFollowUser} following={u.followed} id={u.id} urlImg={u.photos.small} name={u.name} country={u.country} city={u.city} />)
    return (
        <div className="users">
            <div className="pagination">
                <Pagination {...props}/>
            </div>
            <div className="users__items">
                <div className="users__item">
                    {userList}
                </div>
            </div>
        </div>
    )
}
export default Users