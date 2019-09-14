import React from 'react';

import Post from './Post/Post';
import s from './Posts.module.css'

const Posts = (props) => {
    let postsElements = props.data.postsData.map(post => <Post key={post.id} likeCount={post.likeCount} name={post.name} text={post.text} />);

    const postChange = (e) => {
        props.updateNewPost(e.currentTarget.value);
    }

    return (
        <div className={s.posts}>
            <ul className={s.list}>
                {postsElements}
            </ul>
            <div className={s.title}>Написать на стену</div>
            <textarea className="textarea" onChange={postChange} value={props.data.newPostValue} />
            <button className="button" onClick={props.addPost}>Отправить</button>
        </div>
    )
}

export default Posts;