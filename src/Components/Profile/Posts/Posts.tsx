import { postType } from 'Components/Redux/profile-reducer'
import React from 'react'
import Post from './post/post'
import './Posts.css'
type postsProps = {img:string,id:number,data: postType[]}
const Posts:React.FC<postsProps> = ({img,id,data}) => {
    let postsList = data.map((post:postType, i:number) => <Post key={i} img={img} message={post.message} />)
    return (
        <div className='posts__items'>
            {postsList}
        </div>
    )
}

export default Posts