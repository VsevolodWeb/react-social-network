import React from 'react';
import s from './Posts.module.css'
import Post from './Post/Post';

import {addPostActionCreator, postChangeActionCreator} from '../../../redux/profile-reducer'

const Posts = (props) => {
    let postsElements = props.data.postsData.map(post => <Post key={post.id} likeCount={post.likeCount} name={post.name} text={post.text} />);

    const addPost = () => {
        if(!props.data.newPostValue) return;
        props.dispatch(addPostActionCreator());
    }

    const postChange = (e) => {
        props.dispatch(postChangeActionCreator(e.currentTarget.value));
    }

    return (
        <div className={s.posts}>
            <ul className={s.list}>
                {postsElements}
            </ul>
            <div className={s.title}>Написать на стену</div>
            <textarea className="textarea" onChange={postChange} value={props.data.newPostValue} />
            <button className="button" onClick={addPost}>Отправить</button>
        </div>
    )
}

export default Posts;