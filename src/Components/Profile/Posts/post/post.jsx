import React from 'react'
import './post.css'
const Post = (Props) => {
    return (
        <div className='posts__item'>
            <div className='item__content'>
                <img className='content__img' src='https://th.bing.com/th/id/OIP.HNI8wajAFrxNtxfv5uRRIAHaJ4?pid=ImgDet&w=720&h=960&rs=1'></img>
                <span className='content__message'>{Props.message}</span>
            </div>
            <span className='content__likes'>{Props.likes}👍</span>
        </div>
    )
}
export default Post