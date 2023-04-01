import { appStateType } from "Components/Redux/redux-store"
import { followingInProgressType} from "Components/Redux/users-reducer"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Pagination from "./Pagination/Pagination"
import User from "./User/user"
import UserLoader from "./User/User-loader/User-loader"
import './Users.css'
import { UserType } from "types/types"

export type UsersPropsType = {
    unFollowUserThunk: (userId: number) => void
    followUserThunk: (userId: number) => void
    followingProgress: number[]
    followingInProgress: (isFetch:boolean, id:number) => followingInProgressType
    totalCount:number
    pageSize:number
    currentPage:number,
    onChangePage: (p:number)=>void
}
const Users: React.FC<UsersPropsType> = ({ unFollowUserThunk, followUserThunk, followingProgress, followingInProgress, totalCount,pageSize,currentPage,onChangePage}) => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    let { users, isFetching } = useSelector((state: appStateType) => state.usersPage)
    return (
        <div className="users">
            <div className="pagination">
                <Pagination {...{totalCount,pageSize,currentPage,onChangePage}} />
            </div>
            <div className="users__items">
                <div className="users__item">
                    {isFetching ? [...new Array(15)].map((_, i) => <UserLoader key={i} />)
                        : users.map((u: UserType) => <User key={u.id} unFollowUserThunk={unFollowUserThunk} followUserThunk={followUserThunk} followingProgress={followingProgress} following={u.followed} id={u.id} urlImg={u.photos.small || 'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} name={u.name} />)}
                </div>
            </div>
        </div>
    )
}
export default Users
