import React from 'react'
import { postType } from 'types/types'
import Post from './post/post'
import './Posts.css'
type postsProps = {img:string|null,data: postType[]}
const Posts:React.FC<postsProps> = ({img,data}) => {
    let postsList = data.map((post:postType, i:number) => <Post key={i} img={img||""} message={post.message} />)
    return (
        <div className='posts__items'>
            {postsList}
        </div>
    )
}

export default Posts