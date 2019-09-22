import React from 'react';

import Post from './Post/Post';
import s from './Posts.module.css'

const Posts = (props) => {
    let postsElements = props.data.map(post => <Post key={post.id} likeCount={post.likeCount} name={post.name} text={post.text} />);

    const postChange = (e) => {
        props.updateNewPost(e.currentTarget.value);
    }

    const addPost = () => {
        if(!props.newPostValue) return;
        props.addPost();
    }

    return (
        <div className={s.posts}>
            <ul className={s.list}>
                {postsElements}
            </ul>
            <div className={s.title}>Написать на стену</div>
            <textarea className="textarea" onChange={postChange} value={props.newPostValue} />
            <button className="button" onClick={addPost}>Отправить</button>
        </div>
    )
}

export default Posts;