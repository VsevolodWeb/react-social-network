import React from 'react';
import {Field} from 'redux-form';

const PostsForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className="textarea" value={props.newPostValue} component="textarea" />
            <button className="button">Отправить</button>
        </form>
    )
}

export default PostsForm;