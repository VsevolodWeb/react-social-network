import React from 'react';

import Post from './Post/Post';
import s from './Posts.module.css'
import PostsForm from './PostsForm/PostsForm';

const Posts = (props) => {
    let postsElements = props.data.map(post => <Post key={post.id} likeCount={post.likeCount} name={post.name} text={post.text} />);

    const postsFormSubmit = formData => {
        props.addPost(formData);
    }

    return (
        <div className={s.posts}>
            <ul className={s.list}>
                {postsElements}
            </ul>
            <div className={s.title}>Написать на стену</div>
            <PostsForm onSubmit={postsFormSubmit} />
        </div>
    )
}

export default Posts;