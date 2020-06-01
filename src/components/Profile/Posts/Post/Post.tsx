import React from 'react';
import s from './Post.module.css'
import image from '../../Info/avatar.jpg'

const Post = props => {
    return (
        <li className={s.item}>
            <img src={image} alt="avatar" className={s.avatar}/>
            <div>
                <div className={s.name}>{props.name}</div>
                <div className={s.text}>{props.text}</div>
            </div>
            <div className={s.like}>
                <span className={s.likeCounter}>{props.likeCount}</span>
                <button className={s.likeButton}>
                    <span role="img" aria-label="love">❤️</span>
                </button>
            </div>
        </li>
    )
};

export default Post;