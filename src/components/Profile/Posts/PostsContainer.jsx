import React from 'react';

import {addPostActionCreator, updateNewPostActionCreator} from '../../../redux/profile-reducer'
import Posts from './Posts';

const PostsContainer = (props) => {
    console.log(props)
    const addPost = () => {
        if(!props.data.newPostValue) return;

        props.dispatch(addPostActionCreator());
    }

    const updateNewPost = (value) => {
        props.dispatch(updateNewPostActionCreator(value));
    }

    return <Posts updateNewPost={updateNewPost} addPost={addPost} data={props.data} />
}

export default PostsContainer;