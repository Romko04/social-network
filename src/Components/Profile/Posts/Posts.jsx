import React from 'react'
import Post from './post/post'
import './Posts.css'

const Posts = (props) => {
    let postsList = props.data.map(post => <Post img={props.img} key={post.id} likes={post.likes} message={post.message} />)
    return (
        <div className='posts__items'>
            {postsList}
        </div>
    )
}

export default Posts