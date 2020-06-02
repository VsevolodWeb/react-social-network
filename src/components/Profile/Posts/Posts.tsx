import React from 'react';

import Post from './Post/Post';
import s from './Posts.module.css'
import PostsForm from './PostsForm/PostsForm';
import {actions, PostsData} from "../../../redux/profile-reducer";


export type FormDataType = {
    postMessage: string
}
type PropsType = {
    data: typeof PostsData
    addPost: typeof actions.addPost
    resetForm: typeof actions.resetForm
}

const Posts: React.FC<PropsType> = props => {
    let postsElements = props.data.map(post => <Post key={post.id} likeCount={post.likeCount} name={post.name} text={post.text} />);

    const postsFormSubmit = (formData: FormDataType) => {
        props.addPost(formData.postMessage);
        props.resetForm();
    };

    return (
        <div className={s.posts}>
            <ul className={s.list}>
                {postsElements}
            </ul>
            <div className={s.title}>Написать на стену</div>
            <PostsForm onSubmit={postsFormSubmit} />
        </div>
    )
};

export default Posts;