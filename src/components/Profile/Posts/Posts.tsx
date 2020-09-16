import React from 'react';

import Post from './Post/Post';
import s from './Posts.module.css'
import PostsForm from './PostsForm/PostsForm';
import {actions, PostsData} from "../../../redux/profile-reducer";
import {useDispatch, useSelector} from 'react-redux'
import {getPostsData} from '../../../redux/profile-selectors'


export type FormDataType = {
    postMessage: string
}

function Posts() {
    const postsData = useSelector(getPostsData)
    const dispatch = useDispatch()
    let postsElements = postsData.map(post => <Post key={post.id} likeCount={post.likeCount} name={post.name} text={post.text} />);

    const postsFormSubmit = (formData: FormDataType) => {
        dispatch(actions.addPost(formData.postMessage))
        dispatch(actions.resetForm())
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