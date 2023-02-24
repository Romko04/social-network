import React from 'react'
import Post from './post/post'
const Posts = React.memo((props) => {
    let postsList = props.data.map(post => <Post key={post.id} likes={post.likes} message={post.message} />)
    return (
        <div>
            posts
            <div>new posts</div>
            <div>
                {postsList}
            </div>
        </div>
    )
})
export default Posts