import React from 'react'
import './post.css'
const Post = (props) => {
    return (
        <div className='posts__item'>
            <div className='item__content'>
                <img className='content__img' src={props.img} alt='img'></img>
                <span className='content__message'>{props.message}</span>
            </div>
        </div>
    )
}


export default Post
