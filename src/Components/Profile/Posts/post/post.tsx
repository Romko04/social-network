import React from 'react'
import './post.css'
type postProps = {img:string,message:string}
const Post:React.FC<postProps> = ({img,message}) => {
    return (
        <div className='posts__item'>
            <div className='item__content'>
                <img className='content__img' src={img||'https://th.bing.com/th/id/R.aa0dc156cb44d0a2080ad0dd36ea216e?rik=8P1Q2UFnhLHE8g&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_80352.png&ehk=icgjtf%2fljaB6v78NlA0ABgusrHm5aqDMlI44ob6HvUc%3d&risl=&pid=ImgRaw&r=0'} alt='img'></img>
                <span className='content__message'>{message}</span>
            </div>
        </div>
    )
}


export default Post
