import React from 'react'
import './post.css'
type postProps = {img:string,message:string}
const Post:React.FC<postProps> = ({img,message}) => {
    return (
        <div className='posts__item'>
            <div className='item__content'>
                <img className='content__img' src={img} alt='img'></img>
                <span className='content__message'>{message}</span>
            </div>
        </div>
    )
}


export default Post
